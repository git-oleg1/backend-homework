import { Module } from '@nestjs/common';
import { QubeService } from './qube.service';
import { QubeController } from './qube.controller';
import { qubeProviders } from './qube.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [QubeController],
  providers: [QubeService, ...qubeProviders],
})
export class QubeModule {}
