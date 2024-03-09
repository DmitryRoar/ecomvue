import React, { FunctionComponent, ReactElement, ReactNode } from 'react';

declare module 'react' {
  interface CSSProperties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}

// material-ui
import { ChipProps, SvgIconTypeMap, TableCellProps } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

// project imports
import { CalendarStateProps } from './calendar';
import { CartStateProps } from './cart';
import { ChatStateProps } from './chat';
import { ContactStateProps } from './contact';
import { CustomerStateProps } from './customer';
import { KanbanStateProps } from './kanban';
import { MailStateProps } from './mail';
import { ProductStateProps } from './product';
import { SnackbarProps } from './snackbar';
import { UserProps } from './user';

// types
import { UserProfile } from 'types/user-profile';
import { MarketplaceProps } from './marketplace';
import { OgranizationProps } from './organization';
import { ReferalProps } from './referal';
import { TariffProps } from './tariff';

// ==============================|| TYPES ||============================== //

export type ArrangementOrder = 'asc' | 'desc' | undefined;

export type DateRange = { start: number | Date; end: number | Date };

export type GetComparator = (o: ArrangementOrder, o1: string) => (a: KeyedObject, b: KeyedObject) => number;

export type Direction = 'up' | 'down' | 'right' | 'left';

export interface TabsProps {
  children?: React.ReactElement | React.ReactNode | string;
  value: string | number;
  index: number;
}

export interface GenericCardProps {
  title?: string;
  primary?: string | number | undefined;
  secondary?: string;
  content?: string;
  image?: string;
  dateTime?: string;
  iconPrimary?: OverrideIcon;
  color?: string;
  size?: string;
}

export type OverrideIcon =
  | (OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
      muiName: string;
    })
  | React.ComponentClass<any>
  | FunctionComponent<any>
  | any;

export interface EnhancedTableHeadProps extends TableCellProps {
  onSelectAllClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  order: ArrangementOrder;
  orderBy?: string;
  numSelected: number;
  rowCount: number;
  onRequestSort: (e: React.SyntheticEvent, p: string) => void;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
}

export type HeadCell = {
  id: string;
  numeric: boolean;
  label: string;
  disablePadding?: string | boolean | undefined;
  align?: 'left' | 'right' | 'inherit' | 'center' | 'justify' | undefined;
};

export type LinkTarget = '_blank' | '_self' | '_parent' | '_top';

export type NavItemTypeObject = {
  children?: NavItemType[];
  items?: NavItemType[];
  type?: string;
};

export type NavItemType = {
  id?: string;
  icon?: GenericCardProps['iconPrimary'];
  target?: boolean;
  external?: boolean;
  url?: string | undefined;
  type?: string;
  title?: ReactNode | string;
  color?: 'primary' | 'secondary' | 'default' | undefined;
  caption?: ReactNode | string;
  breadcrumbs?: boolean;
  disabled?: boolean;
  chip?: ChipProps;
  children?: NavItemType[];
  elements?: NavItemType[];
  search?: string;
};

export type AuthSliderProps = {
  title: string;
  description: string;
};

export interface ColorPaletteProps {
  color: string;
  label: string;
  value: string;
}

export interface DefaultRootStateProps {
  marketplace: MarketplaceProps;
  organization: OgranizationProps;
  tariff: TariffProps;
  referal: ReferalProps;
  snackbar: SnackbarProps;
  cart: CartStateProps;
  kanban: KanbanStateProps;
  customer: CustomerStateProps;
  contact: ContactStateProps;
  product: ProductStateProps;
  chat: ChatStateProps;
  calendar: CalendarStateProps;
  mail: MailStateProps;
  user: UserProps;
}

export interface ColorProps {
  readonly [key: string]: string;
}

export type GuardProps = {
  children: ReactElement | null;
};

export interface StringColorProps {
  id?: string;
  label?: string;
  color?: string;
  primary?: string;
  secondary?: string;
}

export type KeyedObject = {
  [key: string]: string | number | KeyedObject | any;
};

export interface InitialLoginContextProps {
  isLoggedIn?: boolean | null;
  isInitialized?: boolean;
  user?: UserProfile | unknown;
}

export interface IPayloadLoginType extends InitialLoginContextProps {
  partUser?: any;
}

export interface FormInputProps {
  bug: KeyedObject;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | undefined;
  label: string;
  name: string;
  required?: boolean;
  InputProps?: {
    label: string;
    startAdornment?: React.ReactNode;
  };
}

export type HandleFunction = (i: string, s: string) => Promise<void>;

export type LayoutType = 'authGuard' | 'guestGuard' | 'minimalLayout';
/** ---- Common Functions types ---- */

export type StringBoolFunc = (s: string) => boolean;
export type StringNumFunc = (s: string) => number;
export type NumbColorFunc = (n: number) => StringColorProps | undefined;
export type ChangeEventFunc = (e: React.ChangeEvent<HTMLInputElement>) => void;
