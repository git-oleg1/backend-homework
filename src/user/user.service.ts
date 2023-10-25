import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { USERS_REPOSITORY } from 'src/constants';
import { WhereOptions } from 'sequelize';
import { RoleService } from 'src/role/role.service';
import { CreateUserDto } from './dto/create-user.dto';
import { omit } from 'lodash';

@Injectable()
export class UserService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private repository: typeof User,
    private readonly roleService: RoleService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Выбираю роли по названиям
    const roles = await this.roleService.findAll({ name: createUserDto.roles });
    // Если в базе оказалось меньше ролей чем указано в запросе, то была указана неизвестная роль
    if (roles.length !== createUserDto.roles.length) {
      throw new Error('Указана неизвестная роль');
    }

    return this.repository.sequelize.transaction(async (transaction) => {
      // создание пользователя
      const user = await this.repository.create(
        omit(createUserDto, ['roles']),
        { transaction },
      );
      // добавление ролей пользователю
      await user.$set(
        'roles',
        roles.map((role) => role.id),
        { transaction },
      );
      user.roles = roles;
      return user;
    });
  }

  findAll(): Promise<User[]> {
    return this.repository.findAll({
      include: ['roles'],
    });
  }

  findOne(
    options: WhereOptions<User>,
    associations: string[] = [],
  ): Promise<User | null> {
    return this.repository.findOne({
      where: options,
      include: associations,
    });
  }

  findByEmail(email: string, associations: string[] = []) {
    return this.findOne({ email }, associations);
  }

  findByPk(id: number, associations: string[] = []): Promise<User | null> {
    return this.repository.findByPk(id, {
      include: associations,
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findByPk(id);
    user.set(updateUserDto);
    return await user.save();
  }

  async remove(id: number) {
    const n = await this.repository.destroy({ where: { id } });
    return n === 1;
  }
}
