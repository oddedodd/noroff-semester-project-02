import { authGuard } from '../../utilities/authguard.js';
import { headers } from '../../api/headers.js';
import { API_BASE } from '../../api/constants.js';

authGuard();

/**
 * Fetches and displays the current user's profile information
 * @async
 * @function getProfile
 * @returns {Promise<void>} Promise that resolves when the profile is displayed
 * @description Fetches and displays the current user's profile information, including banner and avatar URLs
 */
const username = localStorage.getItem('username');
console.log(username);
async function getProfile() {
  const response = await fetch(
    `${API_BASE}/auction/profiles/${username}?_listings=true`,
    {
      headers: headers(),
    },
  );

  const { data } = await response.json();
  console.log(data);

  document.querySelector('#profile-name').textContent = data.name;
  document.querySelector('#profile-email').textContent = data.email;
  document.querySelector('#profile-credits').textContent = data.credits;

  if (data.avatar && data.avatar.url) {
    document.querySelector('.rounded-full').src = data.avatar.url;
    document.querySelector('.rounded-full').alt =
      data.avatar.alt || `${data.name}'s avatar`;
  }

  const listingsContainer = document.querySelector('.grid');
  listingsContainer.innerHTML = ''; // Clear existing listings

  if (data.listings && data.listings.length > 0) {
    data.listings.forEach((listing) => {
      const listingHtml = `
        <div class="bg-background-scarlet-extra-light rounded-xl p-4 overflow-hidden" role="article">
      <a href="/listings/view/?id=${listing.id}"><img src="${listing.media[0]?.url || 'https://via.placeholder.com/300x200'}" alt="${listing.title}" class="w-full h-48 rounded-xl object-cover"></a>
      <div class="p-4">
        <a href="/listings/view/?id=${listing.id}" class="hover:text-scarlet"><h3 class="text-xl font-semibold mb-2">${listing.title}</h3></a>
        <p class="text-charcoal">${(listing.description || 'No description available').slice(0, 20)}...</p>
        <div class="mt-4">

          <p class="font-semibold text-charcoal">Ends: ${new Date(listing.endsAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
      `;
      listingsContainer.insertAdjacentHTML('beforeend', listingHtml);
    });
  } else {
    listingsContainer.innerHTML =
      '<p class="col-span-full text-center text-gray-500">No listings found</p>';
  }
}

getProfile();
