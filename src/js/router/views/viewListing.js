import { API_BASE } from '../../api/constants';
import { headers } from '../../api/headers.js';

/**
 * Handles displaying a single auction listing with all its details and bid functionality
 * @async
 * @function viewListing
 * @returns {Promise<void>} Promise that resolves when the listing is displayed
 * @description Fetches and displays a single auction listing including:
 * - Listing details (title, description, seller)
 * - Current highest bid and bid history
 * - Image carousel for any images associated with the listing
 * - Tags
 * - Form for placing a bid
 */
export default async function viewListing() {
  const urlParams = new URLSearchParams(window.location.search);
  const listingId = urlParams.get('id');

  if (!listingId) {
    const notFoundContainer = document.createElement('div');

    notFoundContainer.classList.add(
      'container',
      'mx-auto',
      'px-4',
      'py-8',
      'text-center',
      'text-lg',
      'text-scarlet',
    );
    notFoundContainer.textContent = 'Listing not found';

    document.querySelector('main').innerHTML = '';
    document.querySelector('main').appendChild(notFoundContainer);
    return;
  }

  // Fetch listing data with seller and bids information
  const response = await fetch(
    `${API_BASE}/auction/listings/${listingId}?_seller=true&_bids=true`,
    {
      headers: headers(),
    },
  );

  if (!response.ok) {
    document.querySelector('main').innerHTML = `
      <div class="container mx-auto px-4 py-8 text-center">
        Failed to load listing. Please try again later.
      </div>
    `;
    return;
  }

  const { data: listing } = await response.json();

  document.title = `FlipBid - ${listing.title}`;
  document.querySelector('#listing-title').textContent = listing.title;
  document.querySelector('#listing-description').textContent =
    listing.description;
  document.querySelector('#seller-name').textContent = listing.seller.name;

  // Update current price (highest bid or "No bids yet")
  const highestBid = listing.bids?.length
    ? Math.max(...listing.bids.map((bid) => bid.amount))
    : 0;

  if (highestBid > 0) {
    document.querySelector('#listing-price').innerHTML =
      `<span class="text-scarlet text-lg font-bold">Current Bid: ${highestBid} </span> <span class="text-gray-600">credits</span>`;
  } else {
    document.querySelector('#listing-price').textContent = 'No bids yet';
  }

  // Update end date
  const endsAt = new Date(listing.endsAt);
  document.querySelector('#listing-ends').textContent =
    `Ends: ${endsAt.toLocaleDateString()}`;

  // Update images with carousel functionality
  if (listing.media && listing.media.length > 0) {
    const mainImage = document.querySelector('#listing-image');
    let currentImageIndex = 0;

    // Set up main image
    mainImage.src = listing.media[0].url;
    mainImage.alt = listing.media[0].alt || listing.title;

    // Add arrow navigation
    const prevButton = document.querySelector('#prev-image');
    const nextButton = document.querySelector('#next-image');

    if (prevButton && nextButton) {
      prevButton.addEventListener('click', () => {
        currentImageIndex =
          (currentImageIndex - 1 + listing.media.length) % listing.media.length;
        mainImage.src = listing.media[currentImageIndex].url;
        mainImage.alt = listing.media[currentImageIndex].alt || listing.title;
      });

      nextButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % listing.media.length;
        mainImage.src = listing.media[currentImageIndex].url;
        mainImage.alt = listing.media[currentImageIndex].alt || listing.title;
      });

      // Show/hide arrows based on number of images
      if (listing.media.length <= 1) {
        prevButton.classList.add('hidden');
        nextButton.classList.add('hidden');
      } else {
        prevButton.classList.remove('hidden');
        nextButton.classList.remove('hidden');
      }
    }
  }

  // Update tags
  const tagsContainer = document.querySelector('#tags-container');
  tagsContainer.innerHTML = '';

  listing.tags.forEach((tag) => {
    const tagSpan = document.createElement('span');
    tagSpan.className =
      'bg-scarlet text-white font-semibold px-3 py-1 rounded-full text-sm';
    tagSpan.textContent = tag;
    tagsContainer.appendChild(tagSpan);
  });

  // Update bid history
  const bidsContainer = document.querySelector('#bids-container');
  bidsContainer.innerHTML = '';

  if (listing.bids?.length) {
    listing.bids.sort((a, b) => new Date(b.created) - new Date(a.created));
    listing.bids.forEach((bid) => {
      bidsContainer.innerHTML += `
      <div class="flex justify-between items-center py-2">
        <div class="font-medium flex items-center gap-2"><img src="${bid.bidder.avatar ? bid.bidder.avatar.url : 'https://via.placeholder.com/32'}" alt="${bid.bidder.name}'s avatar" class="w-8 h-8 rounded-full object-cover">${bid.bidder.name}</div>
        <div><span class="text-scarlet text-lg font-bold">${bid.amount}</span> <span class="text-sm text-gray-500">credits</span></div>
        <div class="text-gray-500 text-sm">${getTimeAgo(new Date(bid.created))}</div>
      </div>
      `;
    });
  } else {
    bidsContainer.innerHTML = '<p class="text-gray-500">No bids yet</p>';
  }

  // Add bid form handler
  const bidForm = document.querySelector('form');
  bidForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = Number(document.getElementById('bid-amount').value);

    const response = await fetch(
      `${API_BASE}/auction/listings/${listingId}/bids`,
      {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ amount }),
      },
    );

    if (!response.ok) {
      alert('Failed to place bid. Please try again.');
      return;
    }

    // Refresh the page to show the new bid
    window.location.reload();
  });
}

/**
 * Formats a date into a human-readable "time ago" string
 * @param {Date} date - The date to format
 * @returns {string} A human-readable string representing how long ago the date was
 * @description Converts a date into a relative time string like "2 hours ago" or "3 days ago"
 */
function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' years ago';

  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';

  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';

  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';

  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes ago';

  return Math.floor(seconds) + ' seconds ago';
}

viewListing();
