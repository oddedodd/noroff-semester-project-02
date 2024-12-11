import { API_AUTH_LOGIN } from '../constants.js';

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

    console.log('User logged in successfully!');
    window.location.href = '/profile/';
  }
}
