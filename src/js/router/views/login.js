import { login } from '../../api/auth/login.js';

function showError(message) {
  // Remove any existing error message first
  const existingError = document.querySelector('#login-error');
  if (existingError) {
    existingError.remove();
  }

  // Create and insert new error message
  const errorDiv = document.createElement('div');
  errorDiv.id = 'login-error';
  errorDiv.className = 'mt-4 text-scarlet text-lg text-center font-semibold';
  errorDiv.textContent = message;

  const form = document.querySelector('#login-form');
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.insertAdjacentElement('afterend', errorDiv);
}

document.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Remove any existing error message when submitting
  const existingError = document.querySelector('#login-error');
  if (existingError) {
    existingError.remove();
  }

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  login(data.email, data.password).catch((error) => {
    showError(error.message);
  });
});
