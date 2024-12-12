import { register } from '../../api/auth/register.js';

document.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  register(data.name, data.email, data.password);
});
