import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Имя пользователя',
    example: 'Альберт',
  })
  @IsOptional()
  name: string;

  @ApiPropertyOptional({
    description: 'Пароль пользователя',
    example: '12345',
    minLength: 5,
    maxLength: 15,
  })
  @IsOptional()
  @MinLength(5)
  @MaxLength(15)
  password: string;
}
