import { API_BASE } from '../../../api/constants';

/**
 * Creates and displays a featured listings section with horizontal scrolling
 * @function createFeaturedSection
 * @description Fetches recent listings from the API and displays them in a 
 * horizontally scrollable container with navigation buttons. Includes touch 
 * scroll support for mobile devices.
 * @returns {void}
 */
function createFeaturedSection() {
  const featuredSection = document.querySelector('#featured');
  if (!featuredSection) return;

  // Initially set loading state
  const container = document.createElement('div');
  container.className = 'container mx-auto px-4 py-8';

  const heading = document.createElement('h2');
  heading.className = 'text-3xl font-bold mb-6';
  heading.textContent = 'Featured Listings';

  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'text-center';
  loadingDiv.textContent = 'Loading featured listings...';

  container.appendChild(heading);
  container.appendChild(loadingDiv);
  featuredSection.appendChild(container);

  // Fetch listings from API
  fetch(`${API_BASE}/auction/listings?_bids=true&sort=created&sortOrder=desc`)
    .then((response) => response.json())
    .then((data) => {
      const featuredListings = data.data.slice(0, 10);
      let listingsHTML = '';

      featuredListings.forEach((listing) => {
        listingsHTML += `
          <div class="flex-shrink-0 w-80 snap-start">
              <div class="bg-background-scarlet-light p-4 rounded-xl overflow-hidden">
                  <a href="/listings/view/?id=${listing.id}"><img src="${listing.media && listing.media[0] && listing.media[0].url ? listing.media[0].url : 'https://placehold.co/320x200'}"
                       alt="${listing.title}" 
                       class="w-full h-48 object-cover rounded-xl"></a>
                  <div class="p-4">
                      <a href="/listings/view/?id=${listing.id}" class="hover:text-scarlet"><h3 class="text-xl font-semibold mb-2 capitalize">${listing.title}</h3></a>
                      <p class="text-charcoal">${(listing.description || 'No description available').slice(0, 20)}...</p>
                      <div class="mt-2 text-sm">
                          <p class="text-charcoal">Current bids: ${listing._count?.bids || 0}</p>
                          <p class="text-charcoal font-semibold">Ends: ${new Date(listing.endsAt).toLocaleDateString()}</p>
                      </div>
                  </div>
              </div>
          </div>
        `;
      });

      featuredSection.innerHTML = `
                <div class="container mx-auto px-4 py-8">
                    <h2 class="text-3xl font-bold mb-6">Featured Listings</h2>
                    <div class="relative">
                        <div class="overflow-x-auto flex gap-4 snap-x snap-mandatory scroll-smooth pb-4" id="cardContainer">
                            ${listingsHTML}
                        </div>
                        <div class="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-4 pointer-events-none">
                            <button class="pointer-events-auto bg-white/80 hover:bg-white rounded-full p-2 shadow-md" onclick="scrollCards('left')">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>
                            <button class="pointer-events-auto bg-white/80 hover:bg-white rounded-full p-2 shadow-md" onclick="scrollCards('right')">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            `;

      /**
       * Scrolls the card container left or right
       * @function scrollCards
       * @param {string} direction - The scroll direction ('left' or 'right')
       */
      window.scrollCards = function (direction) {
        const container = document.querySelector('#cardContainer');
        const scrollAmount = 320; 

        if (direction === 'left') {
          container.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth',
          });
        } else {
          container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth',
          });
        }
      };

      // Add touch scroll functionality for mobile
      let startX;
      const container = document.querySelector('#cardContainer');

      container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX;
      });

      container.addEventListener('touchmove', (e) => {
        if (!startX) return;

        const x = e.touches[0].pageX;
        const walk = (startX - x) * 2;

        container.scrollLeft += walk;
        startX = x;
      });

      container.addEventListener('touchend', () => {
        startX = null;
      });
    });
}

export { createFeaturedSection };
