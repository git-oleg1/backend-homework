import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RoleModule } from 'src/role/role.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    RoleModule,
    JwtModule.registerAsync({
      useFactory() {
        const config = new ConfigService();
        return {
          global: true,
          secret: config.get('JWT_SECRET', 'UNDEFINED_JWT_SECRET_KEY'),
          signOptions: { expiresIn: config.get('JWT_TOKEN_EXPIRATION', '24h') },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
