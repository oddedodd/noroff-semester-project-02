import { authGuard } from '../../utilities/authguard.js';
import { headers } from '../../api/headers.js';
import { API_BASE } from '../../api/constants.js';

authGuard();

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

  // Update profile information
  document.querySelector('#profile-name').textContent = data.name;
  document.querySelector('#profile-email').textContent = data.email;
  document.querySelector('#profile-credits').textContent = data.credits;

  // Update avatar image and image alt text
  if (data.avatar && data.avatar.url) {
    document.querySelector('.rounded-full').src = data.avatar.url;
    document.querySelector('.rounded-full').alt =
      data.avatar.alt || `${data.name}'s avatar`;
  }

  // Update listings
  const listingsContainer = document.querySelector('.grid');
  listingsContainer.innerHTML = ''; // Clear existing listings

  if (data.listings && data.listings.length > 0) {
    data.listings.forEach((listing) => {
      console.log(listing);
      const listingHtml = `
        <div class="bg-white border rounded-lg overflow-hidden shadow-sm">
          <a href="/listings/view/?id=${listing.id}"><img src="${listing.media[0]?.url || 'https://via.placeholder.com/300x200'}" 
               alt="${listing.media[0]?.alt || listing.title}" 
               class="w-full h-48 object-cover"></a>
          <div class="p-4">
            <a href="/listings/view/?id=${listing.id}" class="text-dark-purple hover:text-scarlet"><h3 class="font-bold text-lg mb-2">${listing.title}</h3></a>
            <p class="text-gray-600 mb-2">${listing.description}</p>
            <p class="text-gray-600 mb-2">${data.bid}</p>
            <p class="text-sm text-gray-500">Ends at: ${new Date(listing.endsAt).toLocaleDateString()}</p>
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
