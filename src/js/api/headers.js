import { API_KEY } from './constants';
const token = localStorage.getItem('token');

/**
 * Creates and configures headers for API requests
 * @function headers
 * @description Creates Headers object with Content-Type, API key if available,
 * and Authorization token if user is logged in
 * @returns {Headers} Configured Headers object for API requests
 */
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
