import { fetchListings } from '../../api/listings/listings';
import { createListingCard, createPagination } from './components/listingCard';
import {
  initializeSearch,
  initializeFilter,
} from '../../utilities/listingHandlers';

/**
 * Displays a paginated list of auction listings
 * @async
 * @param {number} [page=1] - The page number to display
 * @param {string} [filterOption='newest'] - The filter option to apply 
 * @returns {Promise<void>} Promise that resolves when listings are displayed
 * @description Fetches and displays auction listings with pagination controls, loading state,
 * and scroll-to-top functionality when changing pages
 */
export async function displayListings(page = 1, filterOption = 'newest') {
  const listingsContainer = document.querySelector('.grid');
  const sectionContainer = document.querySelector('section');

  const loadingElement = document.createElement('div');
  loadingElement.className = 'col-span-full text-center py-8';
  loadingElement.textContent = 'Loading listings... please wait';
  listingsContainer.replaceChildren(loadingElement);

  const response = await fetchListings(page, 12, filterOption);

  const fragment = document.createDocumentFragment();
  response.data.forEach((listing) => {
    const listingElement = document.createElement('div');
    listingElement.innerHTML = createListingCard(listing);
    fragment.appendChild(listingElement.firstElementChild);
  });

  listingsContainer.innerHTML = '';
  listingsContainer.appendChild(fragment);

  const existingPagination = document.querySelector('.pagination-controls');
  if (existingPagination) {
    existingPagination.remove();
  }

  const paginationControls = createPagination(response.meta);
  sectionContainer.insertAdjacentHTML(
    'beforeend',
    `<div class="pagination-controls">${paginationControls}</div>`,
  );

  document.querySelectorAll('.pagination-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const newPage = parseInt(e.target.dataset.page);
      displayListings(newPage, filterOption);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

/**
 * Initializes the listings page functionality
 * @function initialize
 * @description Sets up search and filter handlers and displays the initial listings
 */
function initialize() {
  initializeSearch();
  initializeFilter();
  displayListings();
}

initialize();
