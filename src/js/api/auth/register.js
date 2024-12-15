import { API_AUTH_REGISTER } from '../../api/constants.js';

/**
 * Registers a new user with the API
 * @async
 * @function register
 * @param {string} name - User's name (can include spaces for first/last name)
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @throws {Error} If registration fails
 * @returns {Promise<void>} Redirects to login page on success
 */
export async function register(name, email, password) {
  // Format the name to make it possible to have spaces in the name, so that the user can have a first and last name. and remove any special characters.
  const cleanName = name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');

  const response = await fetch(API_AUTH_REGISTER, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ name: cleanName, email, password }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || 'Error registering user');
  }

  alert('User registered successfully!');
  window.location.href = '/auth/login/';
}
