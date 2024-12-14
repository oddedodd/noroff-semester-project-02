const DEFAULT_IMAGE = 'https://placehold.co/320x200';

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