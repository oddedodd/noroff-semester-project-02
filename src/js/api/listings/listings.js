import { API_BASE } from '../constants';

/**
 * Fetches auction listings with pagination and filtering options
 * @async
 * @param {number} [page=1] - The page number to fetch
 * @param {number} [limit=12] - Number of items per page
 * @param {string} [filterOption='newest'] - Filter option ('newest', 'oldest', 'active', 'inactive')
 * @returns {Promise<Object>} The API response containing listings data
 * @throws {Error} If the API request fails
 */
export async function fetchListings(
  page = 1,
  limit = 12,
  filterOption = 'newest',
) {
  let url = `${API_BASE}/auction/listings?page=${page}&limit=${limit}&_seller=true`;

  switch (filterOption) {
    case 'newest':
      url += '&sort=created&sortOrder=desc';
      break;
    case 'oldest':
      url += '&sort=created&sortOrder=asc';
      break;
    case 'active':
      url += '&_active=true';
      break;
    case 'inactive':
      url += '&_active=false';
      break;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

/**
 * Searches auction listings based on a search term
 * @async
 * @param {string} searchTerm - The term to search for in listings
 * @returns {Promise<Object>} The API response containing search results
 * @throws {Error} If the search request fails
 */
export async function searchListings(searchTerm) {
  const response = await fetch(
    `${API_BASE}/auction/listings/search?q=${searchTerm}&_seller=true&sort=created&sortOrder=desc`,
  );
  return await response.json();
}
