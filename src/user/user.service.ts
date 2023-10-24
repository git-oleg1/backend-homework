import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { USERS_REPOSITORY } from 'src/constants';
import { WhereOptions } from 'sequelize';
import { CreateUserModel } from './user.types';

@Injectable()
export class UserService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private repository: typeof User,
  ) {}

  create(createUserDto: CreateUserModel) {
    return this.repository.create(createUserDto, {
      include: [
        {
          association: 'roles',
        },
      ],
    });
  }

  findAll(): Promise<User[]> {
    return this.repository.findAll();
  }

  findOne(options: WhereOptions<User>): Promise<User | null> {
    return this.repository.findOne({ where: options });
  }

  findByPk(id: number): Promise<User | null> {
    return this.repository.findByPk(id);
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
