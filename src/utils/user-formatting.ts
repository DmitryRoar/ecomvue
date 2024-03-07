import { IUserDataAPI, IUserPersonalPart, IUserPersonalPartAPI, IUserSocialPart, IUserSocialPartAPI } from 'contexts/types';
import { UserProfileForm } from 'types/user-profile';
import { nullTostring } from './nullToString';

export const userFormatting = (user: IUserDataAPI): UserProfileForm => {
  const { first_name, last_name, birthday, about_me, phone_number, sc_vk, sc_instagram, sc_facebook, sc_twitter, ...otherUserFieds } = user;
  return {
    ...nullTostring({
      ...otherUserFieds,
      name: first_name,
      surname: last_name,
      aboutMe: about_me,
      phone: phone_number,
      vkontakte: sc_vk,
      instagram: sc_instagram,
      facebook: sc_facebook,
      twitter: sc_twitter,
      placeOfStudy: '',
      placeOfStudyDetails: '',
      placeOfWork: '',
      placeOfWorkDetails: ''
    }),
    dateOfBirth: birthday ? new Date(birthday) : null
  };
};

export const formatCamelCase = (data: any): any => {
  if (data === null || typeof data !== 'object') {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(formatCamelCase);
  }

  return Object.keys(data).reduce((camelObj: any, key) => {
    const camelKey = key.replace(/_([a-z])/g, (match, p1) => p1.toUpperCase());
    camelObj[camelKey] = formatCamelCase(data[key]);
    return camelObj;
  }, {});
};

export const formatDateToString = (date: Date, variant: 'en' | 'ru' = 'en'): string => {
  console.log('🚀 ~ formatDateToString ~ date:', date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  if (variant === 'en') {
    return `${year}-${month}-${day}`;
  }

  return `${day}-${month}-${year}`;
};

export const userUpdateFormattingPersonal = (data: IUserPersonalPartAPI): IUserPersonalPart => {
  return {
    ...nullTostring({
      ...data,
      name: data.first_name,
      surname: data.last_name,
      aboutMe: data.about_me
    }),
    dateOfBirth: data.birthday ? new Date(data.birthday) : null
  };
};

export const userUpdateFormattingPersonalAPI = (data: IUserPersonalPart): IUserDataAPI => {
  const { name, surname, aboutMe, dateOfBirth, ...otherData } = data;
  return {
    ...nullTostring({
      ...otherData,
      first_name: name,
      last_name: surname,
      about_me: aboutMe
    }),
    birthday: dateOfBirth ? formatDateToString(dateOfBirth) : null
  };
};

export const userUpdateFormattingSocial = (data: IUserSocialPartAPI): IUserSocialPart => {
  return nullTostring({
    vkontakte: data.sc_vk,
    instagram: data.sc_instagram,
    facebook: data.sc_facebook,
    twitter: data.sc_twitter
  });
};

export const userUpdateFormattingSocialAPI = (data: IUserSocialPart): IUserSocialPartAPI => {
  return nullTostring({
    sc_vk: data.vkontakte,
    sc_instagram: data.instagram,
    sc_facebook: data.facebook,
    sc_twitter: data.twitter
  });
};
