import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegistrerDto } from './dto/register.dto';
import { LoginResult } from './types';
import { LoginResultDto } from './dto/login-result.dto';
import { compare, hash } from 'bcrypt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResult> {
    const user = await this.validateUser(loginDto);

    if (!user) {
      throw new Error('Пользователь с такими логином и паролем не найден');
    }

    return this.generateToken(user);
  }

  async registration(registerDto: RegistrerDto): Promise<LoginResult> {
    if (await this.usersService.findByEmail(registerDto.email)) {
      throw new Error('Данный email уже используется');
    }

    const password = await hash(registerDto.password, 5);

    const user = await this.usersService.create({
      ...registerDto,
      password,
      roles: ['user'],
    });

    return this.generateToken(user);
  }

  private async validateUser(loginDto: LoginDto) {
    const user = await this.usersService.findOne({ email: loginDto.email }, [
      'roles',
    ]);

    if (!user) {
      return null;
    }

    if (!(await compare(loginDto.password, user.password))) {
      return null;
    }

    return user;
  }

  private async generateToken(user: User): Promise<LoginResult> {
    const roles = user.roles.map((role) => role.name);

    const token = await this.jwtService.sign({
      username: user.name,
      sub: user.id,
      roles,
    });

    return new LoginResultDto(token);
  }
}
