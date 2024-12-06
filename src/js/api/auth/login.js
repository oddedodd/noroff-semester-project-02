import { API_AUTH_LOGIN } from '../constants';

export async function login({ email, password }) {
  try {
    const response = await fetch(API_AUTH_LOGIN, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Login error details:', errorData);
      throw new Error(`Login failed: ${errorData.message || 'Unknown error'}`);
    } else {
      const { data } = await response.json();
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('username', data.name);

      window.location.href = '/profile/';
    }
  } catch (error) {
    console.error('Error logging in user:', error.message);
    throw error; // Re-throw to allow handling by the calling code
  }
}
