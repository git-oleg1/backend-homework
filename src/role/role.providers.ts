import { ROLES_REPOSITORY } from 'src/constants';
import { Role } from './entities/role.entity';

export const rolesProviders = [
  {
    provide: ROLES_REPOSITORY,
    useValue: Role,
  },
];
