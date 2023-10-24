import { ApiProperty } from '@nestjs/swagger';
import { Table, Column, Model, DataType, IsEmail } from 'sequelize-typescript';

@Table({
  tableName: 'users',
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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
}
