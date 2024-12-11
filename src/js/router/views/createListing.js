import { addListing } from "../../api/listings/add";
import { authGuard } from '../../utilities/authguard.js';

authGuard();

const form = document.querySelector('#create-listing-form');
const addMediaBtn = document.querySelector('#add-media-btn');
const mediaContainer = document.querySelector('#media-container');

// Check if elements exist
if (!form) console.error('Form element not found');
if (!addMediaBtn) console.error('Add media button not found');
if (!mediaContainer) console.error('Media container not found');

// Only proceed if required elements exist
if (addMediaBtn && mediaContainer) {
    // Set minimum date for endsAt to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const endsAtInput = document.getElementById('endsAt');
    if (endsAtInput) {
        endsAtInput.min = tomorrow.toISOString().slice(0, 16);
    } else {
        console.error('EndsAt input not found');
    }

    // Add more media inputs
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
        mediaEntry.querySelector('.remove-media-btn').addEventListener('click', () => {
            mediaEntry.remove();
        });
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        // Gather form data
        const formData = new FormData(event.target);
        
        // Process tags
        const tags = formData.get('tags')
            ? formData.get('tags').split(',').map(tag => tag.trim())
            : [];

        // Process media
        const mediaUrls = form.querySelectorAll('[name="media_url[]"]');
        const mediaAlts = form.querySelectorAll('[name="media_alt[]"]');
        const media = [];
        
        for (let i = 0; i < mediaUrls.length; i++) {
            if (mediaUrls[i].value) {
                media.push({
                    url: mediaUrls[i].value,
                    alt: mediaAlts[i].value || ''
                });
            }
        }

        // Create listing object
        const listing = {
            title: formData.get('title'),
            description: formData.get('description'),
            tags,
            media,
            endsAt: new Date(formData.get('endsAt')).toISOString()
        };

        try {
            await addListing(listing);
        } catch (error) {
            alert(error.message);
        }
    });
}