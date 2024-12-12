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
    case '/profile/update/':
      console.log('Importing profileUpdate.js');
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
      console.log('Importing viewListing.js');
      await import('./views/viewListing.js');
      break;
    case '/auth/':
      window.location.href = `/auth/login/`;
      break;

    default:
      console.log('Default case triggered');
      await import('./views/test.js');
  }
}
