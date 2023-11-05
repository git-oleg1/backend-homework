import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Table,
  Column,
  Model,
  DataType,
  IsEmail,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { Qube } from 'src/qube/entities/qube.entity';
import { RoleUser } from 'src/role/entities/role-user.entity';
import { Role } from 'src/role/entities/role.entity';

@Table({
  tableName: 'users',
  underscored: true,
})
export class User extends Model<User> {
  @ApiProperty({
    description: 'Id пользователя',
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
    description: 'Имя пользователя',
    example: 'Альберт',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    description: 'Email пользователя',
    example: 'albert@mail.ru',
  })
  @IsEmail
  @Column({
    allowNull: false,
    unique: true,
  })
  email: string;

  @Exclude()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({
    description: 'Роли пользователя',
    type: [Role],
  })
  @BelongsToMany(() => Role, () => RoleUser)
  roles: Role[];

  @HasMany(() => Qube, 'user_id')
  qubes: Qube[];
}
