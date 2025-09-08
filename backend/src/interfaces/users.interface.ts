import { InternalRoleEnum } from './auth.interface';

export type User = {
  // personId: string;
  username: string;
  name: string;
  givenName: string;
  surname: string;
  role?: InternalRoleEnum;
};

export type ClientUser = {
  name: string;
  username: string;
};
