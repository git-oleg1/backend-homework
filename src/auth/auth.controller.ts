import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from './auth.decorators';
import { RegistrerDto } from './dto/register.dto';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginResultDto } from './dto/login-result.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Аутентификация пользователя',
    description: 'Аутентификация пользователя. Проверка логина и пароля',
  })
  @ApiOkResponse({
    description: 'Аутентификация пользователя успешно пройдена',
    type: LoginResultDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Аутентификация пользователя не пройдена',
  })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  @ApiOperation({
    summary: 'Регистрация пользователя в системе',
    description: 'Регистрация пользователя в системе',
  })
  @ApiOkResponse({
    description: 'Регистрация пользователя успешно пройдена',
  })
  @ApiBadRequestResponse({
    description: 'Введенные данные не верны',
  })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  registration(@Body() registrerDto: RegistrerDto) {
    return this.authService.registration(registrerDto);
  }
}
