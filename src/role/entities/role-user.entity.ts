import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Role } from './role.entity';
import { User } from 'src/user/entities/user.entity';

@Table({
  tableName: 'role_user',
  timestamps: false,
  underscored: true,
})
export class RoleUser extends Model<RoleUser> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    unique: 'roleId_userId',
  })
  roleId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    unique: 'roleId_userId',
  })
  userId: number;
}
