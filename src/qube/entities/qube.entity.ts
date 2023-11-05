import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';

@Table({
  tableName: 'qubes',
  underscored: true,
})
export class Qube extends Model<Qube> {
  @ApiProperty({
    description: 'Id куба',
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
    description: 'Название',
    example: 'Some name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    description: 'Владелец',
  })
  @BelongsTo(() => User, 'user_id')
  user: User;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  path: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    unique: true,
  })
  size: number;
}
