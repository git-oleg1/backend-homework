import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';
import { SEQUELIZE } from 'src/constants';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const configService = new ConfigService();
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: 3306,
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
      });
      sequelize.addModels([User]);
      await sequelize.sync({ force: true });
      return sequelize;
    },
  },
];
