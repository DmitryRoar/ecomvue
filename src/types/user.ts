import { GenericCardProps } from 'types';
import { PostDataType, Profile, UserProfile } from 'types/user-profile';
import { OrganizationRole } from './organization';

export type UserProps = {
  marketplaces: any[];
};

export type UserType = 'employee' | 'executor';

export interface UserSimpleCardProps {
  avatar: string;
  name: string;
  status: string;
}

export interface UserProfileCardProps extends UserProfile {
  profile: string;
}

export interface FriendsCardProps {
  avatar: string;
  location: string;
  name: string;
}

export interface FriendRequestCardProps extends Profile {
  mutual: number;
}

export interface FollowerCardProps {
  avatar: string;
  follow: number;
  location: string;
  name: string;
}

export interface UserStateProps {
  usersS1: UserProfile[];
  usersS2: UserProfileStyle2[];
  followers: FollowerCardProps[];
  friendRequests: FriendRequestCardProps[];
  friends: FriendsCardProps[];
  gallery: GenericCardProps[];
  posts: PostDataType[];
  detailCards: UserProfile[];
  simpleCards: UserSimpleCardProps[];
  profileCards: UserProfileCardProps[];
  error: object | string | null;
}

export type UserProfileStyle2 = {
  image: string;
  name: string;
  designation: string;
  badgeStatus: string;
  subContent: string;
  email: string;
  phone: string;
  location: string;
  progressValue: string;
};

export interface UsersAddProps {
  open: boolean;
  handleCloseDialog: () => void;
  users: IUsers[];
}

export interface IUsers {
  user: {
    date_joined: string;
    email: string;
    full_name: string;
    id: number;
    is_superuser: boolean;
    last_login: string;
  };
  user_role: OrganizationRole;
  user_type: string;
}

export interface IMarketplaces {
  type: string;
  value: string;
}

export interface IUsersInitState {
  error: string | null;
  users: IUsers[];
}

export class StorageNames {
  static readonly referal = 'referal';
  static readonly servicesTitle = 'services-title';
  static readonly token = 'tokens';
  static readonly reportAvitoBalance = 'report-avito-balance-date';
  static readonly reportAvitoPromition = 'report-avito-promotion';
}
