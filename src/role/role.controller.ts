import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RoleService } from './role.service';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@ApiTags('roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({
    summary: 'Создание роли',
    description: 'Создание роли',
  })
  @ApiCreatedResponse({
    description: 'Роль успешно создана',
    type: Role,
  })
  @ApiBadRequestResponse({ description: 'Ошибка валидации' })
  @ApiBody({ type: CreateRoleDto })
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiOperation({
    summary: 'Получение списка ролей',
    description: 'Получение списка ролей с пагинацией',
  })
  @ApiOkResponse({
    type: [Role],
  })
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @ApiOperation({
    summary: 'Получение одной роли',
    description: 'Получение одной роли по id',
  })
  @ApiOkResponse({
    type: Role,
  })
  @ApiNotFoundResponse({
    description: 'Роль не найдена',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findByPk(+id);
  }

  @ApiOperation({
    summary: 'Изменение роли',
    description: 'Изменение роли',
  })
  @ApiBody({ type: UpdateRoleDto })
  @ApiOkResponse({
    description: 'Роль изменена',
    type: Role,
  })
  @ApiNotFoundResponse({
    description: 'Роль не найдена',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @ApiOperation({
    summary: 'Удаление роли',
    description: 'Удаление роли',
  })
  @ApiOkResponse()
  @ApiNotFoundResponse({
    description: 'Роль не найдена',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
