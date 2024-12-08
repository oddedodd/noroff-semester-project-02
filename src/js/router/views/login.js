import { login } from '../../api/auth/login.js';

document.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  login(data.email, data.password);
});
