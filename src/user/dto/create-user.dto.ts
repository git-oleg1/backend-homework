import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Альберт',
    minLength: 3,
    maxLength: 48,
  })
  @MinLength(2)
  @MaxLength(48)
  name: string;

  @ApiProperty({
    description: 'Email пользователя',
    example: 'albert@mail.ru',
    maxLength: 48,
  })
  @MaxLength(48)
  email: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: '12345',
    minLength: 5,
    maxLength: 15,
  })
  @MinLength(5)
  @MaxLength(15)
  password: string;
}
