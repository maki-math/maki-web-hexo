import { Api } from '@/generated-api/Api';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const api = new Api({
  baseURL,
});
