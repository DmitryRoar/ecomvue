export type TariffPlanNames = 'Месячный' | 'Годовой';

export type Tariff = {
  name: string;
  funcionals: {
    name: string;
    value: string;
  }[];
  plans: {
    id: number;
    name: string;
    price: TariffPlanNames;
  }[];
};

export type TariffProps = {
  list: Tariff[];
};
