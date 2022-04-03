import { Api } from '@/generated-api/Api';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const api = new Api({ baseUrl });
