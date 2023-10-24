import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { ROLES_REPOSITORY } from 'src/constants';
import { WhereOptions } from 'sequelize';

@Injectable()
export class RoleService {
  constructor(
    @Inject(ROLES_REPOSITORY)
    private repository: typeof Role,
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
}
