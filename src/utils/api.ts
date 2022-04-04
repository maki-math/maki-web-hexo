import { Api } from '@/generated-api/Api';
import { AxiosRequestConfig } from 'axios';
import { getToken } from './auth-token';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const config: AxiosRequestConfig = {
  baseURL,
};

export const api = new Api(config);

api.instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});
