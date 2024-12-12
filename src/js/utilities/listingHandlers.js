import { searchListings } from '../api/listings/listings';
import { createListingCard } from '../router/views/components/listingCard';
import { displayListings } from '../router/views/listings';

const DEBOUNCE_DELAY = 300;
const MIN_SEARCH_LENGTH = 3;

export function initializeSearch() {
  const searchInput = document.querySelector('#search-input');
  const listingsGrid = document.querySelector('.grid');
  let debounceTimer = null;

  const cleanup = () => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
  };

  searchInput.addEventListener('input', (e) => {
    cleanup();
    const searchTerm = e.target.value.trim();

    if (searchTerm.length < MIN_SEARCH_LENGTH) {
      if (searchTerm.length === 0) {
        displayListings(1);
      }
      return;
    }

    debounceTimer = setTimeout(async () => {
      listingsGrid.innerHTML = '<div class="col-span-full text-center py-8">Searching...</div>';

      const data = await searchListings(searchTerm);

      if (!data.data || data.data.length === 0) {
        listingsGrid.innerHTML = '<div class="col-span-full text-center py-8">No listings found</div>';
        return;
      }

      listingsGrid.innerHTML = '';
      data.data.forEach(listing => {
        listingsGrid.innerHTML += createListingCard(listing);
      });
    }, DEBOUNCE_DELAY);
  });

  window.addEventListener('unload', cleanup);
}

export function initializeFilter() {
  const filterSelect = document.querySelector('#filter-listings');
  
  filterSelect.addEventListener('change', (e) => {
    const filterOption = e.target.value;
    displayListings(1, filterOption);
  });
}