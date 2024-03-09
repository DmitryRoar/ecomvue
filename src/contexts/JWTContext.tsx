'use client';

import { createContext, PropsWithChildren, useEffect, useReducer, useState } from 'react';

import accountReducer from 'store/accountReducer';
import { LOGIN, LOGOUT, UPDATE_USER_PERSONAL } from 'store/actions';

import axios from 'utils/axios';

import { DASHBOARD_PATH } from 'config';
import { useRouter } from 'next/navigation';
import { AuthToken, JWTContextType, SocialMediaType } from 'types/auth';
import { StorageNames } from 'types/user';
import { IUserDataAPI } from './types';

const JWTContext = createContext<JWTContextType | null>(null);

export const JWTProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [user, dispatch] = useReducer(accountReducer, null);
  const [token, setToken] = useState<AuthToken | null>(null);

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
    } else {
      onLogout();
    }
  }, []);

  const onGetUser = async (): Promise<void> => {
    try {
      setLoading(true);
      const { data: user } = await axios.get('/v1/users/self/');

      dispatch({
        type: LOGIN,
        payload: { user }
      });
    } catch (err: any) {
      // "token_not_valid" -> constants
      if (err.code === 'token_not_valid') {
        onRefresh();
      } else {
        dispatch({
          type: LOGOUT
        });
      }
      console.log(err.code);
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
    const { data: tokens } = await axios.post('/v1/auth/login/', { email, password });
    setToken(tokens);
    router.push(DASHBOARD_PATH);
  };

  const onRegister = async (email: string, password: string): Promise<void> => {
    const { data: tokens } = await axios.post('/v1/auth/register/', {
      email,
      password
    });

    setToken(tokens);
  };

  const onRegisterViaMedia = async (type: keyof typeof SocialMediaType, code: string): Promise<void> => {
    const {
      data: { tokens, ...user }
    } = await axios.post('/v1/auth/social-media/', {
      code,
      social_media_type: type
    });

    setToken(tokens);
    dispatch({
      type: LOGIN,
      payload: {
        user
      }
    });
  };

  const onUpdateUser = async (data: Partial<IUserDataAPI>): Promise<void> => {
    try {
      const { data: userData } = await axios.patch('/v1/users/self/', data);
      dispatch({
        type: UPDATE_USER_PERSONAL,
        payload: { partUser: userData }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onLogout = (): void => {
    dispatch({
      type: LOGOUT
    });
    setToken(null);
    for (let key in localStorage) {
      if (key !== 'berry-config-ts') {
        localStorage.removeItem(key);
      }
    }
    localStorage.removeItem(StorageNames.token);
  };

  return (
    <JWTContext.Provider
      value={{
        loading,
        user,
        onLogin,
        onRegister,
        onRegisterViaMedia,
        onUpdateUser,
        onLogout
      }}
    >
      {children}
    </JWTContext.Provider>
  );
};

export default JWTContext;
