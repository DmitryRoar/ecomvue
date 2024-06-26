/**
 * axios setup to use mock service
 */

import axios from 'axios';
import { AuthToken } from 'types/auth';
import { StorageNames } from 'types/user';

const axiosServices = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_OLD_URL
});

axiosServices.interceptors.request.use((config) => {
  const tokens = JSON.parse(localStorage.getItem(StorageNames.token) as string) as AuthToken;
  const confirmMail = JSON.parse(localStorage.getItem(StorageNames.confirmMail) as string) as boolean;
  if (tokens?.access && !confirmMail) {
    config.headers.Authorization = `jwt ${tokens.access}`;
  }
  return config;
});

// interceptor for http
axiosServices.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

export default axiosServices;
