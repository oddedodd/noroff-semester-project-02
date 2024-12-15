/**
 * Logs out the current user by clearing localStorage and redirecting to login page
 * @function Logout
 * @returns {void} Redirects to login page
 */
export function Logout() {
  localStorage.clear();
  window.location.href = '/auth/login/';
}
