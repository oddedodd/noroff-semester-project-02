import { API_AUTH_LOGIN } from '../constants.js';

/**
 * Authenticates a user with the API and stores their token
 * @async
 * @function login
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @throws {Error} If login fails
 * @returns {Promise<void>} Redirects to profile page on success
 */
export async function login(email, password) {
  const response = await fetch(API_AUTH_LOGIN, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  const json = await response.json();

  if (!response.ok) {
    const errorMessage = json.errors?.[0]?.message || 'Error logging in user';
    throw new Error(errorMessage);
  } else {
    const { accessToken, name } = json.data;
    localStorage.setItem('token', accessToken);
    localStorage.setItem('username', name);

    window.location.href = '/profile/';
  }
}
