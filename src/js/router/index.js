export default async function router(pathname = window.location.pathname) {
  console.log('Current pathname:', pathname);
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
    case '/auth/logout/':
      await import('../utilities/logout.js');
      break;
    case '/listings/':
      console.log('Importing listings.js');
      await import('./views/listings.js');
      break;
    case '/listings/add/':
      await import('./views/createListing.js');
      break;
    case '/auth/':
      window.location.href = `/auth/login/`;
      break;

    default:
      console.log('Default case triggered');
      await import('./views/test.js');
  }
}
