import { API_BASE } from "../../api/constants";

async function fetchListings(page = 1, limit = 12) {
    const response = await fetch(`${API_BASE}/auction/listings?page=${page}&limit=${limit}&_seller=true&sort=created&sortOrder=desc`);
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
                <h3 class="text-xl font-semibold mb-2">${listing.title}</h3>
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
            ${meta.previousPage ? 
                `<button class="bg-charcoal hover:bg-ecru text-white font-semibold rounded px-5 py-2 pagination-btn" data-page="${meta.previousPage}">Previous</button>` : 
                ''
            }
            <span class="flex items-center font-medium">Page ${meta.currentPage} of ${meta.pageCount}</span>
            ${meta.nextPage ? 
                `<button class="bg-charcoal hover:bg-ecru text-white font-semibold rounded px-5 py-2 pagination-btn" data-page="${meta.nextPage}">Next</button>` : 
                ''
            }
        </div>
    `;
}

async function displayListings(page = 1) {
    const listingsContainer = document.querySelector('.grid');
    const sectionContainer = document.querySelector('section');
    
    listingsContainer.innerHTML = '<div class="col-span-full text-center py-8">Loading listings...</div>';

    const response = await fetchListings(page);
    
    if (!response?.data) {
        listingsContainer.innerHTML = '<div class="col-span-full text-center py-8">Error loading listings</div>';
        return;
    }

    listingsContainer.innerHTML = response.data
        .map(listing => createListingCard(listing))
        .join('');

    const existingPagination = document.querySelector('.pagination-controls');
    if (existingPagination) existingPagination.remove();
    
    const paginationControls = createPaginationControls(response.meta);
    sectionContainer.insertAdjacentHTML('beforeend', `<div class="pagination-controls">${paginationControls}</div>`);

    document.querySelectorAll('.pagination-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const newPage = parseInt(e.target.dataset.page);
            displayListings(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

displayListings();
