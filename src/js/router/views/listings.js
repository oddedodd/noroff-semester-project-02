import { API_BASE } from '../../api/constants';

async function fetchListings(page = 1, limit = 12) {
  const response = await fetch(
    `${API_BASE}/auction/listings?page=${page}&limit=${limit}&_seller=true&sort=created&sortOrder=desc`,
  );
  const data = await response.json();
  return data;
}

function createListingCard(listing) {
  const endDate = new Date(listing.endsAt).toLocaleDateString();
  const imageUrl = listing.media?.[0]?.url || 'https://placehold.co/320x200';

  return `
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="${imageUrl}" alt="${listing.title}" class="w-full h-48 object-cover">
            <div class="p-4">
                <a href="/listings/view/?id=${listing.id}"><h3 class="text-xl font-semibold mb-2">${listing.title}</h3></a>
                <p class="text-gray-600">${listing.description || 'No description available'}</p>
                <div class="mt-4">
                    <p class="text-blue-600">Current bids: ${listing._count.bids}</p>
                    <p class="font-semibold">Ends: ${endDate}</p>
                </div>
            </div>
        </div>
    `;
}

function createPaginationControls(meta) {
  return `
        <div class="flex justify-center gap-4 mt-8">
            ${
              meta.previousPage
                ? `<button class="bg-charcoal hover:bg-ecru text-white font-semibold rounded px-5 py-2 pagination-btn" data-page="${meta.previousPage}">Previous</button>`
                : ''
            }
            <span class="flex items-center font-medium">Page ${meta.currentPage} of ${meta.pageCount}</span>
            ${
              meta.nextPage
                ? `<button class="bg-charcoal hover:bg-ecru text-white font-semibold rounded px-5 py-2 pagination-btn" data-page="${meta.nextPage}">Next</button>`
                : ''
            }
        </div>
    `;
}

async function displayListings(page = 1) {
  const listingsContainer = document.querySelector('.grid');
  const sectionContainer = document.querySelector('section');

  listingsContainer.innerHTML =
    '<div class="col-span-full text-center py-8">Loading listings...</div>';

  const response = await fetchListings(page);

  listingsContainer.innerHTML = '';
  response.data.forEach((listing) => {
    listingsContainer.innerHTML += createListingCard(listing);
  });

  const existingPagination = document.querySelector('.pagination-controls');

  if (existingPagination) {
    existingPagination.remove();
  }

  const paginationControls = createPaginationControls(response.meta);
  sectionContainer.insertAdjacentHTML(
    'beforeend',
    `<div class="pagination-controls">${paginationControls}</div>`,
  );

  document.querySelectorAll('.pagination-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const newPage = parseInt(e.target.dataset.page);
      displayListings(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
  initializeSearch();
}

function initializeSearch() {
  const searchInput = document.querySelector('#search-input');
  const listingsGrid = document.querySelector('.grid');

  let debounceTimer = "";

  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim();

    // Clear the previous timer
    clearTimeout(debounceTimer);

    // making sure the search term is at least 3 characters before calling the API
    if (searchTerm.length < 3) {
      if (searchTerm.length === 0) {
        displayListings(1);
      }
      return;
    }

    // Make sure we don't make too many requests to the APIs
    debounceTimer = setTimeout(async () => {
      const searchingContainer = document.createElement('div');
      searchingContainer.classList.add('col-span-full', 'text-center', 'py-8');
      searchingContainer.textContent = 'Searching...';
      listingsGrid.innerHTML = '';
      listingsGrid.appendChild(searchingContainer);

      const response = await fetch(
        `${API_BASE}/auction/listings/search?q=${searchTerm}&_seller=true&sort=created&sortOrder=desc`,
      );
      const data = await response.json();

      if (!data.data || data.data.length === 0) {
        listingsGrid.innerHTML =
          '<div class="col-span-full text-center py-8">No listings found</div>';
        return;
      }

      listingsGrid.innerHTML = '';
      data.data.forEach(listing => {
        listingsGrid.innerHTML += createListingCard(listing);
      });
    }, 300); // Wait 300ms after user stops typing before making API call
  });
}

displayListings();
