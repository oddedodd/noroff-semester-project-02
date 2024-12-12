import { API_BASE } from '../constants';

export async function fetchListings(page = 1, limit = 12, filterOption = 'newest') {
  try {
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
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw error;
  }
}

export async function searchListings(searchTerm) {
  try {
    const response = await fetch(
      `${API_BASE}/auction/listings/search?q=${searchTerm}&_seller=true&sort=created&sortOrder=desc`
    );
    return await response.json();
  } catch (error) {
    console.error('Error searching listings:', error);
    throw error;
  }
}