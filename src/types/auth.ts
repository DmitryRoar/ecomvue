import { IUserDataAPI, IUserPersonalPart } from 'contexts/types';
import { UserProfile } from './user-profile';

export interface IAuthLogin {
  email: string;
  password: string;
  referral_code?: string;
}

export interface IToken {
  refresh: string;
  access: string;
}

export interface IAuthUser {
  id?: number;
  full_name?: string;
  email: string;
  is_superuser?: boolean;
  date_joined?: string;
  last_login?: string;
  tokens?: IToken;
}

export interface IAuthPasswordReset {
  email: string;
}

export interface ITokenRefresh {
  refresh: string;
}

export const SocialMediaType = {
  yandex_auth: 'yandex_auth',
  vk_auth: 'vk_auth',
  mail_ru_auth: 'mail_ru_auth'
} as const;

export type AuthToken = {
  access: string;
  refresh: string;
};

export type JWTContextType = {
  loading: boolean;
  user: UserProfile | null;
  onLogin: (email: string, password: string) => Promise<void>;
  onRegister: (email: string, password: string) => Promise<void>;
  onRegisterViaMedia: (type: keyof typeof SocialMediaType, code: string) => Promise<void>;
  onUpdateUser: (data: Partial<IUserDataAPI> | IUserPersonalPart) => Promise<void>;
  onLogout: () => void;
};
