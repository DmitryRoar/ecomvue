export type ReportAvitoBalance = {
  balance: {
    real: number;
    bonus: number;
  }[];
  operations: {
    amount_total: number;
    operation_name: string;
  }[];
};

export enum ReportAvitoItemEnum {
  active = 'active',
  removed = 'removed',
  old = 'old',
  blocked = 'blocked',
  rejected = 'rejected',
  not_found = 'not_found',
  another_user = 'another_user'
}

export type IReportAvitoList = {
  id?: number;
  address: string;
  category: {
    name: string;
    id: number;
  };
  price: number;
  status: keyof typeof ReportAvitoItemEnum;
  title: string;
  url: string;
};

export type IReportAvitoPromotion = {
  amount: number;
};

export enum ReportAvitoPackageEnum {
  'x2_1' = 'x2_1',
  'x2_7' = 'x2_7',
  'x5_1' = 'x5_1',
  'x5_7' = 'x5_7',
  'x10_1' = 'x10_1',
  'x10_7' = 'x10_7',
  'x15_1' = 'x15_1',
  'x15_7' = 'x15_7',
  'x20_1' = 'x20_1',
  'x20_7' = 'x20_7'
}
