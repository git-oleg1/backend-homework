import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';
import { SEQUELIZE } from 'src/constants';
import { Role } from 'src/role/entities/role.entity';
import { RoleUser } from 'src/role/entities/role-user.entity';
import { Qube } from 'src/qube/entities/qube.entity';

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
      sequelize.addModels([User, Role, RoleUser, Qube]);
      await sequelize.sync({ force: false });
      return sequelize;
    },
  },
];
