/**
 * axios setup to use mock service
 */

import axios from 'axios';
import { AuthToken } from 'types/auth';
import { StorageNames } from 'types/user';

const axiosServices = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3010/'
  // withCredentials: true
});

axiosServices.interceptors.request.use((config) => {
  const tokens = JSON.parse(localStorage.getItem(StorageNames.token) as string) as AuthToken;
  if (tokens?.access) {
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
