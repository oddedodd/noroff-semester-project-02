export default async function router(pathname = window.location.pathname) {
  console.log('Current pathname:', pathname);
  switch (pathname) {
    case '/':
      await import('./views/home.js');
      break;
    case '/test/':
      await import('./views/test.js');
      break;
    case '/auth/register/':
      await import('./views/register.js');
      break;
    case "/auth/login/":
      console.log('Importing login.js');
      await import("./views/login.js");
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
    //   case "/profile/":
    //     await import("./views/profile.js");
    //     break;
    default:
      console.log('Default case triggered');
      await import('./views/test.js');
  }
}
