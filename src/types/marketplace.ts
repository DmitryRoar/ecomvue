// material-ui

import { MarketplaceEnum, ProjectPermission, ProjectType } from './project';

// ==============================|| SNACKBAR TYPES ||============================== //

export type Marketplace = {
  id?: number;
  marketplace_type: keyof typeof MarketplaceEnum;
  name: string;
  created_at?: string;
  updated_at?: string;
  connections: any[];
};

export type BaseCreate = {
  marketplace_id: number;
  name: string;
};

export type MarketplaceCreate = Pick<Marketplace, 'name' | 'marketplace_type'> & { organization_id: number };

export type ConnectionCreate = {
  marketplace_id: number;
  name: string;
  token: string;
  permissions: number[];
};

export type CreateConnectionWb = {
  name: string;
  token: string;
  permissions: number[] | string[];
};

export type CreateConnectionAvito = {
  name: string;
  client_id: string;
  client_secret: string;
};

export interface MarketplaceProps {
  types: ProjectType[];
  projects: Marketplace[];
  permissions: ProjectPermission[];
  error: string | null;
}
