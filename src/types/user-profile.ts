// types
import { HandleFunction } from 'types';

// ==============================|| TYPES - SNACKBAR ||============================== //

export type ProfileProgress = {
  label: string;
  variant: string;
  value: number;
};

export type UserProfile = {
  id?: string;
  avatar?: string;
  image?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  about_me?: string;
  birthday?: string;
  phone_number?: string;
  place_of_study?: string;
  place_of_study_detail?: string;
  place_of_work?: string;
  place_of_work_detail?: string;
  sc_facebook?: string;
  sc_instagram?: string;
  sc_twitter?: string;
  sc_vk?: string;
  education?: any;
  role?: string;
  about?: string;
  email?: string;
  work_email?: string;
  personal_email?: string;
  phone?: string;
  work_phone?: string;
  personal_phone?: string;
  birthdayText?: string;
  lastMessage?: string;
  status?: string;
  friends?: number;
  followers?: number;
  contact?: string;
  company?: string;
  location?: string;
  online_status?: string;
  unReadChatCount?: number;
  groups?: Group[];
  time?: string;
  tier?: string;
  Progress?: ProfileProgress;

  surname: string;
  pathronymic: string;
  country: string;
  city: string;
  dateOfBirth: Date | null;
  aboutMe: string;
  username: string;
  placeOfStudy: string;
  placeOfStudyDetails: string;
  placeOfWork: string;
  placeOfWorkDetails: string;
  vkontakte: string;
  instagram: string;
  facebook: string;
  twitter: string;
};

export type UserProfileForm = Pick<
  UserProfile,
  | 'id'
  | 'name'
  | 'surname'
  | 'pathronymic'
  | 'country'
  | 'city'
  | 'dateOfBirth'
  | 'aboutMe'
  | 'username'
  | 'email'
  | 'phone'
  | 'placeOfStudy'
  | 'placeOfStudyDetails'
  | 'placeOfWork'
  | 'placeOfWorkDetails'
  | 'vkontakte'
  | 'instagram'
  | 'facebook'
  | 'twitter'
>;

export type Profile = {
  id: string;
  avatar: string;
  name: string;
  time: string;
};

export type PostImage = {
  img: string;
  featured?: boolean;
  title?: string;
};

export type Likes = {
  like: boolean;
  value: number;
};

export type Group = {
  id: string;
  avatar: string;
  name: string;
};

export type Reply = {
  id: string;
  profile: Profile;
  data: CommentData;
};

export type CommentData = {
  name?: string;
  comment?: string;
  likes?: Likes;
  video?: string;
  replies?: Reply[];
};

export type PostData = {
  id?: string;
  content: string;
  images: PostImage[];
  video?: string;
  likes: Likes;
  comments?: Comment[];
};
export type Comment = {
  id: string;
  profile: Profile;
  data?: CommentData;
};
export type Post = {
  id?: string;
  profile: Profile;
  data: PostData;
};

export type PostDataType = { id: string; data: PostData; profile: Profile };

export interface PostProps {
  commentAdd: (s: string, c: Reply) => Promise<void>;
  handleCommentLikes: HandleFunction;
  editPost?: HandleFunction;
  renderPost?: HandleFunction;
  setPosts?: React.Dispatch<React.SetStateAction<PostDataType[]>>;
  handlePostLikes: (s: string) => Promise<void>;
  handleReplayLikes: (postId: string, commentId: string, replayId: string) => Promise<void>;
  post: PostDataType;
  replyAdd: (postId: string, commentId: string, reply: Reply) => Promise<void>;
}
