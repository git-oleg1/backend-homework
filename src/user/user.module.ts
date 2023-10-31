import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { usersProviders } from './user.providers';
import { DatabaseModule } from 'src/database/database.module';
import { RoleModule } from 'src/role/role.module';
import { ProfileController } from './profile.controller';

@Module({
  imports: [DatabaseModule, RoleModule],
  controllers: [UserController, ProfileController],
  providers: [UserService, ...usersProviders],
  exports: [UserService],
})
export class UserModule {}
