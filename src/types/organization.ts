import { IAuthUser } from './auth';
import { UserType } from './user';

export enum FunctoolEnum {
  'see' = 1,
  'create_refact' = 2,
  delete = 3
}

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

type OrganizationTariff = {
  tariff_plan: number;
  status: string;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
};

export type Organization = {
  [key: string]: {
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
    tariffs: OrganizationTariff[] | [];
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
