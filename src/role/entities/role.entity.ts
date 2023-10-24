import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';
import { RoleUser } from './role-user.entity';

@Table({
  tableName: 'roles',
  underscored: true,
})
export class Role extends Model<Role> {
  @ApiProperty({
    description: 'Id роли',
    example: 1,
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    description: 'Системное название роли',
    example: 'superuser',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    description: 'Описание роли',
    example: 'Очень важный пользователь',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @BelongsToMany(() => User, () => RoleUser)
  users: User[];
}
