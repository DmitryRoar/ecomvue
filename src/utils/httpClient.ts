/**
 * axios setup to use mock service
 */

import axios from 'axios';
import { AuthToken } from 'types/auth';
import { StorageNames } from 'types/user';

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
});

httpClient.interceptors.request.use((config) => {
  const tokens = JSON.parse(localStorage.getItem(StorageNames.token) as string) as AuthToken;
  const confirmMail = JSON.parse(localStorage.getItem(StorageNames.confirmMail) as string) as boolean;
  // dispatch(
  //   openSnackbar({
  //     open: true,
  //     message: 'dasdasdas',
  //     variant: 'alert',
  //     anchorOrigin: { vertical: 'top', horizontal: 'center' },
  //     close: false,
  //     alert: {
  //       color: 'error'
  //     }
  //   })
  // );
  if (tokens?.access && !confirmMail) {
    config.headers.Authorization = `Bearer ${tokens.access}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

export default httpClient;
