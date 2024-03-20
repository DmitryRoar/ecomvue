'use client';

import { createContext, PropsWithChildren, useCallback, useEffect, useReducer, useState } from 'react';

import accountReducer from 'store/accountReducer';
import { LOGIN, LOGOUT, UPDATE_USER_PERSONAL } from 'store/actions';

import axios from 'utils/axios';

import { AuthToken, JWTContextType, SocialMediaType } from 'types/auth';
import { AuthTypes } from 'types/new-life';
import { StorageNames } from 'types/user';
import { CoreUtils } from 'utils';
import httpClient from 'utils/httpClient';
import { IUserDataAPI } from './types';

const JWTContext = createContext<JWTContextType | null>(null);

export const JWTProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(true);
  const [user, dispatch] = useReducer(accountReducer, null);
  const [token, setToken] = useState<AuthToken | null>(null);
  const [socialRequested, setSocialRequested] = useState(false);

  const confirmMail = JSON.parse(localStorage.getItem(StorageNames.confirmMail) as string);

  useEffect(() => {
    if (token) {
      onGetUser();
      localStorage.setItem(StorageNames.token, JSON.stringify(token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    const storageTokens = JSON.parse(localStorage.getItem(StorageNames.token) as string);

    if (storageTokens) {
      setToken(storageTokens);
    } else if (!confirmMail) {
      onLogout();
    }
    setLoading(false);
  }, [confirmMail]);

  const onGetUser = async (): Promise<void> => {
    try {
      setLoading(true);
      const { data: user } = await axios.get('/v1/users/self/');
      const imageWoOrigin = user?.image ? CoreUtils.imageWoOrigin(user.image) : null;
      dispatch({
        type: LOGIN,
        payload: { user: { ...user, image: imageWoOrigin } }
      });
    } catch (err: any) {
      // "token_not_valid" -> constants
      switch (err.code) {
        case 'token_not_valid':
          return onRefresh();
        default:
          return onLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    try {
      const { data } = await axios.post('/v1/auth/token/refresh/', { refresh: token!.refresh });
      setToken(data);
    } catch (err) {
      console.log(err);
      onLogout();
    }
  };

  const onLogin = async (email: string, password: string): Promise<void> => {
    const { data: tokens } = await httpClient.post('/o/tokens/create/', { email, password });
    setToken(tokens);
  };

  const onRegister = async (email: string, password: string): Promise<void> => {
    await httpClient.post<AuthTypes.Register>('/account/create/', {
      email,
      password
    });

    localStorage.setItem(StorageNames.confirmMail, JSON.stringify(email));

    await httpClient.post('/account/resend_activation/', { email });
  };

  const onConfirmEmail = async (uid: string, token: string): Promise<void> => {
    await httpClient.post('/account/activation/', { uid, token });
    localStorage.removeItem(StorageNames.confirmMail);
  };

  const onRegisterViaMedia = useCallback(
    async (type: keyof typeof SocialMediaType, code: string): Promise<void> => {
      if (socialRequested) return;
      const {
        data: { tokens, ...user }
      } = await axios.post('/v1/auth/social-media/', {
        code,
        social_media_type: type
      });

      setToken(tokens);
      setSocialRequested(true);
      dispatch({
        type: LOGIN,
        payload: {
          user
        }
      });
    },
    [socialRequested]
  );

  const onUpdateUser = async (data: Partial<IUserDataAPI>): Promise<void> => {
    try {
      const { data: userData } = await axios.patch('/v1/users/self/', data);
      const imageWoOrigin = user?.image ? CoreUtils.imageWoOrigin(user.image) : null;
      dispatch({
        type: UPDATE_USER_PERSONAL,
        payload: { partUser: { ...userData, image: imageWoOrigin } }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onUpdateAvatar = async (formData: any) => {
    const { data } = await axios.patch('/v1/users/self/', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

    dispatch({
      type: UPDATE_USER_PERSONAL,
      payload: { partUser: { ...data, image: CoreUtils.imageWoOrigin(data.image) } }
    });
  };

  const onLogout = (): void => {
    setToken(null);
    for (let key in localStorage) {
      if (key !== 'berry-config-ts') {
        localStorage.removeItem(key);
      }
    }
    dispatch({
      type: LOGOUT
    });
  };

  return (
    <JWTContext.Provider
      value={{
        loading,
        confirmMail,
        user,
        onLogin,
        onRegister,
        onRegisterViaMedia,
        onConfirmEmail,
        onUpdateUser,
        onUpdateAvatar,
        onLogout
      }}
    >
      {children}
    </JWTContext.Provider>
  );
};

export default JWTContext;
