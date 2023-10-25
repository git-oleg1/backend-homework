import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email пользователя',
    example: 'albert@mail.ru',
    maxLength: 48,
  })
  @IsNotEmpty()
  @MaxLength(48)
  email: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: '12345',
    minLength: 5,
    maxLength: 15,
  })
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(15)
  password: string;
}
