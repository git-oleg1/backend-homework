import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { rolesProviders } from './role.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RoleController],
  providers: [RoleService, ...rolesProviders],
  exports: [RoleService],
})
export class RoleModule {}
