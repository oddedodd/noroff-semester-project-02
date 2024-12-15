import { authGuard } from '../../utilities/authguard.js';
import { headers } from '../../api/headers.js';
import { API_BASE } from '../../api/constants.js';

authGuard();

const username = localStorage.getItem('username');

/**
 * Displays the current user's profile information
 * @async
 * @function displayProfile
 * @returns {Promise<void>} Promise that resolves when the profile is displayed
 * @description Fetches and displays the current user's profile information, including banner and avatar URLs
 */
async function displayProfile() {
  const response = await fetch(
    `${API_BASE}/auction/profiles/${username}?_listings=true`,
    {
      headers: headers(),
    },
  );

  const { data } = await response.json();

  // Populate the form fields
  document.querySelector('#name').value = data.name || '';
  document.querySelector('#banner').value = data.banner?.url || '';
  document.querySelector('#avatar').value = data.avatar?.url || '';
}
displayProfile();

/**
 * Updates the current user's profile information
 * @async
 * @function updateProfile
 * @param {string} banner - The URL of the new banner image
 * @param {string} avatar - The URL of the new avatar image
 * @returns {Promise<void>} Promise that resolves when the profile is updated
 * @description Sends a PUT request to update the current user's profile information
 */
async function updateProfile() {
  const banner = document.querySelector('#banner').value;
  const avatar = document.querySelector('#avatar').value;

  const response = await fetch(`${API_BASE}/auction/profiles/${username}`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify({
      banner: { url: banner },
      avatar: { url: avatar },
    }),
  });

  if (response.ok) {
    alert('Profile updated successfully!');
    displayProfile(); // Refresh the profile display
  } else {
    alert('Failed to update profile.');
  }
}

document.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  updateProfile(data.banner, data.avatar);
});
