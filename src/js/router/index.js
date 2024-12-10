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
      console.log('Importing profile.js');
      await import('./views/profile.js');
      break;
    case '/auth/logout/':
      console.log('Importing logout.js');
      await import('../utilities/logout.js');
      break;
    case '/listings/':
      console.log('Importing listigs.js');
      await import('./views/listings.js');
      break;
    //   case "/auth/":
    //     await import("./views/auth.js");
    //     break;

    //   case "/post/":
    //     await import("./views/post.js");
    //     break;
    //   case "/post/edit/":
    //     await import("./views/postEdit.js");
    //     break;
    //   case "/post/create/":
    //     await import("./views/postCreate.js");
    //     break;

    default:
      console.log('Default case triggered');
      await import('./views/test.js');
  }
}
