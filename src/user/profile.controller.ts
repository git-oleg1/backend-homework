import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { AuthUser } from 'src/auth/auth-user.decorator';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Получение данных об одном пользователе',
    description: 'Получение данных об одном пользователе по id',
  })
  @ApiOkResponse({
    type: User,
  })
  @Get()
  async me(@AuthUser() user: User) {
    return user;
  }
}
