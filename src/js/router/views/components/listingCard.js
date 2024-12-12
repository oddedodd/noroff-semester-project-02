const DEFAULT_IMAGE = 'https://placehold.co/320x200';

export function createListingCard(listing) {
  const endDate = new Date(listing.endsAt).toLocaleDateString();
  const imageUrl = listing.media?.[0]?.url || DEFAULT_IMAGE;

  return `
    <div class="bg-white rounded-lg shadow-md overflow-hidden" role="article">
      <img src="${imageUrl}" alt="${listing.title}" class="w-full h-48 object-cover">
      <div class="p-4">
        <a href="/listings/view/?id=${listing.id}" aria-label="View details for ${listing.title}">
          <h3 class="text-xl font-semibold mb-2">${listing.title}</h3>
        </a>
        <p class="text-gray-600">${listing.description || 'No description available'}</p>
        <div class="mt-4">
          <p class="text-blue-600">Current bids: ${listing._count.bids}</p>
          <p class="font-semibold">Ends: ${endDate}</p>
        </div>
      </div>
    </div>
  `;
}

export function createPagination(meta) {
  return `
    <div class="flex justify-center gap-4 mt-8">
      ${meta.previousPage
        ? `<button class="bg-charcoal hover:bg-ecru text-white font-semibold rounded px-5 py-2 pagination-btn" data-page="${meta.previousPage}">Previous</button>`
        : ''
      }
      <span class="flex items-center font-medium">Page ${meta.currentPage} of ${meta.pageCount}</span>
      ${meta.nextPage
        ? `<button class="bg-charcoal hover:bg-ecru text-white font-semibold rounded px-5 py-2 pagination-btn" data-page="${meta.nextPage}">Next</button>`
        : ''
      }
    </div>
  `;
}