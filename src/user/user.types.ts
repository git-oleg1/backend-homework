import { Role } from 'src/role/entities/role.entity';

export interface RequestCreateUser {
  name: string;

  email: string;

  password: string;

  roles: string[];
}

export interface CreateUserModel extends Omit<RequestCreateUser, 'roles'> {
  roles: Role[];
}
