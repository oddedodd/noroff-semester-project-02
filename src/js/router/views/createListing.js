import { addListing } from '../../api/listings/add';
import { authGuard } from '../../utilities/authguard.js';

/**
 * Initializes the create listing form functionality
 * @module createListing
 * @description Handles the creation of new auction listings, including form validation,
 * media input management, and submission handling
 */

authGuard();

const form = document.querySelector('#create-listing-form');
const addMediaBtn = document.querySelector('#add-media-btn');
const mediaContainer = document.querySelector('#media-container');

// Set minimum date for endsAt to tomorrow
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const endsAtInput = document.getElementById('endsAt');
if (endsAtInput) {
  endsAtInput.min = tomorrow.toISOString().slice(0, 16);
} else {
  console.error('EndsAt input not found');
}

/**
 * Creates and adds a new media input group to the form
 * @function
 * @description Adds a new set of URL and description inputs for listing media,
 * along with a remove button
 */
addMediaBtn.addEventListener('click', () => {
  console.log('Add media button clicked'); // Debug log
  const mediaEntry = document.createElement('div');
  mediaEntry.className = 'media-entry mb-2';
  mediaEntry.innerHTML = `
          <div class="flex gap-2">
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                     type="url" 
                     name="media_url[]"
                     placeholder="Image URL">
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                     type="text" 
                     name="media_alt[]"
                     placeholder="Image description">
              <button type="button" 
                      class="remove-media-btn bg-scarlet hover:bg-ecru text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Remove
              </button>
          </div>
      `;
  mediaContainer.appendChild(mediaEntry);

  // Add remove button functionality
  mediaEntry
    .querySelector('.remove-media-btn')
    .addEventListener('click', () => {
      mediaEntry.remove();
    });
});

/**
 * Handles the submission of the create listing form
 * @async
 * @param {Event} event - The form submission event
 * @returns {Promise<void>} Promise that resolves when the listing is created
 * @description Processes form data including tags and media, creates a listing object,
 * and submits it to the API
 */
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Gather form data
  const formData = new FormData(event.target);

  // Process tags
  const tags = formData.get('tags')
    ? formData
        .get('tags')
        .split(',')
        .map((tag) => tag.trim())
    : [];

  // Process media
  const mediaUrls = form.querySelectorAll('[name="media_url[]"]');
  const mediaAlts = form.querySelectorAll('[name="media_alt[]"]');
  const media = [];

  for (let i = 0; i < mediaUrls.length; i++) {
    if (mediaUrls[i].value) {
      media.push({
        url: mediaUrls[i].value,
        alt: mediaAlts[i].value || '',
      });
    }
  }

  // Create listing object
  const listing = {
    title: formData.get('title'),
    description: formData.get('description'),
    tags,
    media,
    endsAt: new Date(formData.get('endsAt')).toISOString(),
  };

  try {
    await addListing(listing);
  } catch (error) {
    alert(error.message);
  }
});
