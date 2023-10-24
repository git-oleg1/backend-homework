export interface RequestCreateUser {
  name: string;

  email: string;

  password: string;

  roles: string[];
}

export interface CreateUserModel extends Omit<RequestCreateUser, 'roles'> {}
