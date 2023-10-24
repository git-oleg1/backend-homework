import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Создание пользователя',
    description: 'Создание пользователя',
  })
  @ApiCreatedResponse({
    description: 'Пользователь успешно создан.',
    type: User,
  })
  @ApiBody({ type: CreateUserDto })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({
    summary: 'Получение данных о пользователях',
    description: 'Получение данных о пользователях с пагинацией',
  })
  @ApiOkResponse({
    type: [User],
  })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({
    summary: 'Получение данных об одном пользователе',
    description: 'Получение данных об одном пользователе по id',
  })
  @ApiOkResponse({
    type: User,
  })
  @ApiNotFoundResponse({
    description: 'Пользователь не был найден id.',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findByPk(+id);
    if (!user) throw new HttpException('Пользователь не был найден id', 404);
    return user;
  }

  @ApiOperation({
    summary: 'Изменение данных пользователя',
    description: 'Изменение данных пользователя',
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({
    description: 'Данные пользователя изменены',
    type: User,
  })
  @ApiNotFoundResponse({
    description: 'Пользователь не был найден id',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiOperation({
    summary: 'Удаление пользователя',
    description: 'Удаление пользователя',
  })
  @ApiOkResponse()
  @ApiNotFoundResponse({
    description: 'Пользователь не был найден id.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
