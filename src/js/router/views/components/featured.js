function createFeaturedSection() {
    const featuredSection = document.querySelector('#featured');
    if (!featuredSection) return;

    // Initially set loading state
    featuredSection.innerHTML = `
        <div class="container mx-auto px-4 py-8">
            <h2 class="text-3xl font-bold mb-6">Featured Listings</h2>
            <div class="text-center">Loading featured listings...</div>
        </div>
    `;

    // Fetch listings from API
    fetch('https://api.noroff.dev/api/v1/auction/listings?_bids=true')
        .then(response => response.json())
        .then(listings => {
            const featuredListings = listings.slice(0, 5);

            featuredSection.innerHTML = `
                <div class="container mx-auto px-4 py-8">
                    <h2 class="text-3xl font-bold mb-6">Featured Listings</h2>
                    <div class="relative">
                        <div class="overflow-x-auto flex gap-4 snap-x snap-mandatory scroll-smooth pb-4" id="cardContainer">
                            ${featuredListings.map(listing => `
                                <div class="flex-shrink-0 w-80 snap-start">
                                    <div class="bg-white rounded-lg shadow-md overflow-hidden">
                                        <img src="${listing.media[0] || 'https://placehold.co/320x200'}" 
                                             alt="${listing.title}" 
                                             class="w-full h-48 object-cover">
                                        <div class="p-4">
                                            <h3 class="text-xl font-semibold mb-2">${listing.title}</h3>
                                            <p class="text-gray-600">${listing.description || 'No description available'}</p>
                                            <div class="mt-2 text-sm">
                                                <p class="text-blue-600">Current bids: ${listing._count?.bids || 0}</p>
                                                <p class="font-semibold">Ends: ${new Date(listing.endsAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
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

            // Add scroll functionality
            window.scrollCards = function(direction) {
                const container = document.getElementById('cardContainer');
                const scrollAmount = 320; // Width of one card
                
                if (direction === 'left') {
                    container.scrollBy({
                        left: -scrollAmount,
                        behavior: 'smooth'
                    });
                } else {
                    container.scrollBy({
                        left: scrollAmount,
                        behavior: 'smooth'
                    });
                }
            };

            // Add touch scroll functionality for mobile
            let startX;
            const container = document.getElementById('cardContainer');

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
        })
        .catch(error => {
            console.error('Error fetching listings:', error);
            featuredSection.innerHTML = `
                <div class="container mx-auto px-4 py-8">
                    <h2 class="text-3xl font-bold mb-6">Featured Listings</h2>
                    <div class="text-center text-red-600">Error loading listings. Please try again later.</div>
                </div>
            `;
        });
}

export { createFeaturedSection };