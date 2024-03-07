export enum MarketplaceEnum {
  ozon = 'ozon',
  wildberries = 'wildberries',
  rf_market = 'rf_market',
  avito = 'avito',
  yandex_market = 'yandex_market',
  sber_market = 'sber_market'
}

export type ProjectPermission = {
  type: string;
  value: string;
};

export type ProjectGeneral = {
  id?: number;
  marketplace_type: keyof typeof MarketplaceEnum;
  name: string;
  created_at?: string;
  updated_at?: string;
};

export type ProjectCreate = ProjectGeneral & { token: string; permissions?: number[] };

export type ProjectType = { value: MarketplaceEnum; type: string };
