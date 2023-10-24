import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Системное название роли',
    example: 'superuser',
  })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(32)
  name: string;

  @ApiProperty({
    description: 'Описание роли',
    example: 'Очень важный пользователь',
  })
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  description: string;
}
