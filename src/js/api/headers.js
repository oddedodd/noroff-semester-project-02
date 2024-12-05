import { API_KEY } from './constants';
const token = localStorage.getItem('token');

export function headers() {
  const headers = new Headers();

  headers.append('Content-Type', 'application/json');

  if (API_KEY) {
    headers.append('X-Noroff-API-Key', API_KEY);
  }

  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  return headers;
}
