import {
  Inject,
  Injectable,
  Logger,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { ROLES_REPOSITORY } from 'src/constants';
import { WhereOptions } from 'sequelize';

@Injectable()
export class RoleService implements OnApplicationBootstrap {
  private logger: Logger = new Logger(RoleService.name);

  constructor(
    @Inject(ROLES_REPOSITORY)
    protected repository: typeof Role,
  ) {}

  create(createRoleDto: CreateRoleDto) {
    return this.repository.create(createRoleDto);
  }

  findAll(options?: WhereOptions<Role>) {
    return this.repository.findAll({ where: options });
  }

  findOne(options: WhereOptions<Role>): Promise<Role | null> {
    return this.repository.findOne({ where: options });
  }

  findByName(name: string) {
    return this.repository.findOne({ where: { name } });
  }

  findByPk(id: number): Promise<Role | null> {
    return this.repository.findByPk(id);
  }

  async update(id: number, updateUserDto: UpdateRoleDto) {
    const user = await this.findByPk(id);
    user.set(updateUserDto);
    return await user.save();
  }

  async remove(id: number) {
    const n = await this.repository.destroy({ where: { id } });
    return n === 1;
  }

  async onApplicationBootstrap() {
    const hasAdmin = await this.findOne({
      name: 'admin',
    });

    if (!hasAdmin) {
      this.logger.warn('Initialize roles (admin)');
      this.create({
        name: 'admin',
        description: 'Администратор',
      });
    }

    const hasUser = await this.findOne({
      name: 'user',
    });

    if (!hasUser) {
      this.logger.warn('Initialize roles (user)');
      this.create({
        name: 'user',
        description: 'Обычный пользователь',
      });
    }
  }
}
