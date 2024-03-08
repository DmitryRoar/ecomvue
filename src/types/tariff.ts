export type TariffPlanNames = 'Месячный' | 'Годовой';

export type TariffPlan = {
  id: number;
  name: TariffPlanNames;
  price: string;
};

export type Tariff = {
  name: string;
  funcionals: {
    name: string;
    value: string;
  }[];
  plans: TariffPlan[];
};

export type TariffProps = {
  list: Tariff[];
};
