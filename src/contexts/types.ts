export interface IUserPersonalPartAPI {
  first_name: string | null;
  last_name: string | null;
  pathronymic: string | null;
  birthday: string | null;
  city: string | null;
  country: string | null;
  about_me: string | null;
}

export interface IUserContactPartAPI {
  id: string | null;
  email: string | null;
  phone_number: string | null;
}

export interface IUserSocialPartAPI {
  sc_facebook: string | null;
  sc_instagram: string | null;
  sc_twitter: string | null;
  sc_vk: string | null;
}

export interface IUserEducationPartAPI {
  place_of_study: string | null;
  place_of_study_detail: string | null;
}

export interface IUserWorkPartAPI {
  place_of_work: string | null;
  place_of_work_detail: string | null;
}

// IUserEducationPartAPI,
// IUserWorkPartAPI
export interface IUserDataAPI extends IUserPersonalPartAPI, IUserContactPartAPI, IUserSocialPartAPI {}

export interface IUserPersonalPart {
  name: string;
  surname: string;
  pathronymic: string;
  dateOfBirth: Date | null;
  city: string;
  country: string;
  aboutMe: string;
}

export interface IUserSocialPart {
  vkontakte: string;
  instagram: string;
  facebook: string;
  twitter: string;
}
