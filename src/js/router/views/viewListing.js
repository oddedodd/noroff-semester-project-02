import { API_BASE } from "../../api/constants";
import { headers } from '../../api/headers.js';

export default async function viewListing() {
  // Get listing ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const listingId = urlParams.get('id');

  if (!listingId) {
    // Handle missing ID case
    document.querySelector('main').innerHTML = '<div class="container mx-auto px-4 py-8 text-center">Listing not found</div>';
    return;
  }

  // Fetch listing data with seller and bids information
  const response = await fetch(`${API_BASE}/auction/listings/${listingId}?_seller=true&_bids=true`, {
    headers: headers()
  });
  
  if (!response.ok) {
    document.querySelector('main').innerHTML = `
      <div class="container mx-auto px-4 py-8 text-center">
        Failed to load listing. Please try again later.
      </div>
    `;
    return;
  }

  const { data: listing } = await response.json();

  // Update listing details in the HTML
  document.getElementById('listing-title').textContent = listing.title;
  document.getElementById('listing-description').textContent = listing.description;

  // Update seller info
  if (listing.seller) {
    document.getElementById('seller-name').textContent = listing.seller.name;
  }

  // Update current price (highest bid or "No bids yet")
  const highestBid = listing.bids?.length 
    ? Math.max(...listing.bids.map(bid => bid.amount))
    : 0;
  document.getElementById('listing-price').textContent = highestBid > 0 
    ? `Current Bid: $${highestBid}` 
    : 'No bids yet';

  // Update end date
  const endsAt = new Date(listing.endsAt);
  document.getElementById('listing-ends').textContent = `Ends: ${endsAt.toLocaleDateString()}`;

  // Update images
  if (listing.media && listing.media.length > 0) {
    document.getElementById('listing-image').src = listing.media[0].url;
    document.getElementById('listing-image').alt = listing.media[0].alt || listing.title;
  }

  // Update tags
  const tagsContainer = document.querySelector('.flex.flex-wrap.gap-2');
  tagsContainer.innerHTML = listing.tags
    .map(tag => `<span class="bg-background-primary px-3 py-1 rounded-full text-sm">${tag}</span>`)
    .join('');

  // Update bid history
  const bidsContainer = document.getElementById('bids-container');
  bidsContainer.innerHTML = listing.bids
    ?.sort((a, b) => new Date(b.created) - new Date(a.created))
    .map(bid => `
      <div class="flex justify-between items-center py-2">
        <span class="font-medium">${bid.bidder.name}</span>
        <span class="text-scarlet font-semibold">$${bid.amount}</span>
        <span class="text-gray-500 text-sm">${getTimeAgo(new Date(bid.created))}</span>
      </div>
    `)
    .join('') || '<p class="text-gray-500">No bids yet</p>';

  // Add bid form handler
  const bidForm = document.querySelector('form');
  bidForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = Number(document.getElementById('bid-amount').value);
    
    const response = await fetch(`${API_BASE}/auction/listings/${listingId}/bids`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ amount })
    });

    if (!response.ok) {
      alert('Failed to place bid. Please try again.');
      return;
    }

    // Refresh the page to show the new bid
    window.location.reload();
  });
}

// Helper function to format time ago
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

// Initialize the view
viewListing();