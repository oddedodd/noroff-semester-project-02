import { authGuard } from '../../utilities/authguard.js';
import { headers } from '../../api/headers.js';
import { API_BASE } from '../../api/constants.js';

authGuard();

const username = localStorage.getItem('username');

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
    
    console.log(data);

    updateProfile(data.banner, data.avatar);
});
