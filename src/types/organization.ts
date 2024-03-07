import { IAuthUser } from './auth';
import { UserType } from './user';

export type OrganizationFunc = {
  id: string;
  name: string;
};

export type CreateFunctools = {
  cout: number;
  results: {
    id: string;
    owner: string;
    users: Organization[];
  };
  next?: string;
  previous?: string;
};

export type Organization = {
  my: {
    id: number;
    owner: number;
    users: {
      user: IAuthUser;
      user_type: UserType;
      user_role: {
        id: string;
        name: string;
        functools: OrganizationFunc[];
      };
    }[];
  };
};

export type OrganizationRole = {
  functools: {
    id: number;
    name: string;
  }[];
  id: number;
  is_default: boolean;
  name: string;
};

export type OgranizationProps = {
  organization: Organization | null;
  roles: OrganizationRole[];
  functools?: any[];
};
