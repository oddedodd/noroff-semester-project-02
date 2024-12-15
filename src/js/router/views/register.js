import { register } from '../../api/auth/register.js';

/**
 * Displays an error message on the registration form
 * @param {string} message - The error message to display
 * @description Removes any existing error message and creates a new one with the provided message
 */
function showError(message) {
  // Remove any existing error message first
  const existingError = document.querySelector('#register-error');
  if (existingError) {
    existingError.remove();
  }

  // Create and insert new error message
  const errorDiv = document.createElement('div');
  errorDiv.id = 'register-error';
  errorDiv.className = 'mt-4 text-scarlet text-lg text-center font-semibold';
  errorDiv.textContent = message;

  const form = document.querySelector('#register-form');
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.insertAdjacentElement('afterend', errorDiv);
}

document.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Remove any existing error message when submitting
  const existingError = document.querySelector('#register-error');
  if (existingError) {
    existingError.remove();
  }

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  register(data.name, data.email, data.password).catch((error) => {
    showError(error.message);
  });
});
