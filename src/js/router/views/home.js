function createHeroSection() {
  const heroSection = document.createElement('section');
  heroSection.className = 'container my-10 mx-auto';

  heroSection.innerHTML = `
        <div class="flex flex-col-reverse md:flex-row w-full">
            <div class="w-full md:w-1/2 p-8">
                <img src="splash02.svg" alt="vector drawing of a mobile phone viewing a listing on an online auction site">
            </div>
            <div class="w-full md:w-1/2 p-4">
                <div class="flex flex-col justify-center h-full text-center md:text-left">
                    <h1 class="text-4.5xl font-bold uppercase">Welcome to FlipBid</h1>
                    <p class="text-2.5xl font-thin uppercase">Find your next treasure here!</p>
                    <p class="text-lg font-thin mt-4 max-w-[600px] mx-auto md:mx-0">Discover amazing auctions and unbeatable deals on products you love. Whether you're here to score a rare find or list your treasures for bidding, FlipBid makes it fast, secure, and exciting.</p>
                    <p class="text-xl font-semibold mt-4">Start flipping and bidding today!</p>
                    <div class="flex gap-4 mt-4 justify-center md:justify-start">
                        <button id="joinButton" class="bg-blue-950 hover:bg-red-700 text-white font-semibold uppercase rounded px-5 py-2 mt-4">Join now</button>
                        <button id="exploreButton" class="bg-red-950 hover:bg-red-700 text-white font-semibold uppercase rounded px-5 py-2 mt-4">Explore listings</button>
                    </div>
                </div>
            </div>
        </div>
    `;

  // Add event listeners to buttons
  const joinButton = heroSection.querySelector('#joinButton');
  const exploreButton = heroSection.querySelector('#exploreButton');

  joinButton.addEventListener('click', () => {
    // Add your join navigation logic here
    console.log('Join button clicked');
  });

  exploreButton.addEventListener('click', () => {
    // Add your explore navigation logic here
    console.log('Explore button clicked');
  });

  // Clear and update the app container
  const hero = document.getElementById('hero');
  hero.innerHTML = '';
  hero.appendChild(heroSection);
}
createHeroSection();
