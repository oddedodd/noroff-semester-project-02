import { API_BASE } from '../constants.js';
import { headers } from '../headers.js';

export async function addListing(data) {
    const response = await fetch(`${API_BASE}/auction/listings`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.errors?.[0]?.message || 'Failed to create listing');
    }

    const result = await response.json();
    console.log(result);
    console.log(result.data.id);
    // window.location.href = `/listings/${result.data.id}`;
}