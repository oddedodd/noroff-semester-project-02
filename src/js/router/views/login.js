import { login } from '../../api/auth/login.js';

document.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  try {
    await login({ email: data.email, password: data.password });
  } catch (error) {
    // Handle login error (e.g., display error message to user)
    console.error('Login failed:', error);
  }
});
