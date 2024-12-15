/**
 * Router function that handles outing based on the current pathname
 * @param {string} [pathname=window.location.pathname] - The pathname to route to. Defaults to current window location pathname
 * @returns {Promise<void>} - Returns a promise that resolves when the appropriate module is loaded
 * @description Routes to different views based on the pathname and dynamically imports the corresponding modules.
 * Handles routes for home, authentication (register/login/logout), profile management, and listing operations.
 * Defaults to home view for unmatched routes.
 */
export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case '/':
      await import('./views/home.js');
      break;
    case '/auth/register/':
      await import('./views/register.js');
      break;
    case '/auth/login/':
      await import('./views/login.js');
      break;
    case '/profile/':
      await import('./views/profile.js');
      break;
    case '/profile/update/':
      await import('./views/profileUpdate.js');
      break;
    case '/auth/logout/':
      await import('../utilities/logout.js');
      break;
    case '/listings/':
      await import('./views/listings.js');
      break;
    case '/listings/add/':
      await import('./views/createListing.js');
      break;
    case '/listings/view/':
      await import('./views/viewListing.js');
      break;
    case '/auth/':
      window.location.href = `/auth/login/`; 
      break;
    default:
      await import('./views/home.js');
  }
}
