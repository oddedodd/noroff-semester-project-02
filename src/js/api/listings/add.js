import { API_BASE } from '../constants.js';
import { headers } from '../headers.js';

/**
 * Creates a new auction listing
 * @async
 * @function addListing
 * @param {Object} data - The listing data to submit
 * @param {string} data.title - The title of the listing
 * @param {string} data.description - The description of the listing
 * @param {string[]} data.media - Array of media URLs for the listing
 * @param {string} data.endsAt - The end date/time of the listing
 * @throws {Error} If the API request fails
 * @returns {Promise<void>} Redirects to profile page on success
 */
export async function addListing(data) {
  const response = await fetch(`${API_BASE}/auction/listings`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors?.[0]?.message || 'Failed to create listing');
  }

  const result = await response.json();
  window.location.href = `/profile/`;
}
