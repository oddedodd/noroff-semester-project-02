/** Default placeholder image URL for listings without media */
const DEFAULT_IMAGE = 'https://placehold.co/320x200';

/**
 * Creates an HTML string for a listing card component
 * @param {Object} listing - The listing data object
 * @param {string} listing.id - The unique identifier for the listing
 * @param {string} listing.title - The title of the listing
 * @param {string} listing.description - The description of the listing
 * @param {Array} listing.media - Array of media objects for the listing
 * @param {string} listing.endsAt - The end date/time of the listing
 * @param {Object} listing._count - Object containing count data
 * @param {number} listing._count.bids - Number of bids on the listing
 * @returns {string} HTML string for the listing card
 */
export function createListingCard(listing) {
  const endDate = new Date(listing.endsAt).toLocaleDateString();
  const imageUrl = listing.media?.[0]?.url || DEFAULT_IMAGE;

  return `
    <div class="bg-background-scarlet-extra-light rounded-xl p-4 overflow-hidden" role="article">
      <a href="/listings/view/?id=${listing.id}"><img src="${imageUrl}" alt="${listing.title}" class="w-full h-48 rounded-xl object-cover"></a>
      <div class="p-4">
        <a href="/listings/view/?id=${listing.id}" class="hover:text-scarlet"><h3 class="text-xl font-semibold mb-2">${listing.title}</h3></a>
        <p class="text-charcoal">${(listing.description || 'No description available').slice(0, 20)}...</p>
        <div class="mt-4">
          <p class="text-charcoal">Current bids: ${listing._count.bids}</p>
          <p class="font-semibold text-charcoal">Ends: ${endDate}</p>
        </div>
      </div>
    </div>
  `;
}

/**
 * Creates pagination controls HTML
 * @param {Object} meta - Pagination metadata
 * @param {number} meta.currentPage - Current page number
 * @param {number} meta.pageCount - Total number of pages
 * @param {number|null} meta.previousPage - Previous page number or null if none
 * @param {number|null} meta.nextPage - Next page number or null if none
 * @returns {string} HTML string for pagination controls
 */
export function createPagination(meta) {
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
