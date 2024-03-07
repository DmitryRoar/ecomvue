export interface LabelValue {
  label: string;
  value: number;
}

export interface ICreateReferal {
  id: number | null;
  user_type: LabelValue | null;
  role_id: LabelValue | null;
  obj: boolean;
  email?: string;
  first_name?: string;
  last_name?: string;
}

export type ReferalProps = {
  list: [];
  token: string;
  joined: boolean;
};
