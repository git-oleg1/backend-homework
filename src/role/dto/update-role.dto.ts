import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';
import { MinLength, MaxLength, IsOptional } from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @ApiPropertyOptional({
    description: 'Системное название роли',
    example: 'superuser',
  })
  @IsOptional()
  @MinLength(3)
  @MaxLength(32)
  name?: string;

  @ApiPropertyOptional({
    description: 'Описание роли',
    example: 'Очень важный пользователь',
  })
  @IsOptional()
  @MinLength(5)
  @MaxLength(255)
  description?: string;
}
