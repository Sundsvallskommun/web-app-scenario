import { InternalRoleEnum } from './auth.interface';

export type User = {
  username: string;
  name: string;
  givenName: string;
  surname: string;
  groups?: string[];
  role?: InternalRoleEnum;
  isExternal?: boolean;
  externalUserId?: number;
};

export type ClientUser = {
  name: string;
  username: string;
};
