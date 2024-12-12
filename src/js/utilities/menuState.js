import { setLogoutListener } from './logout.js';

export function updateMenuState() {
  const isLoggedIn = localStorage.getItem('username') !== null;

  const profileLinks = document.querySelectorAll('.profile-link');
  const signInBtns = document.querySelectorAll('.signin-btn');
  const logoutBtns = document.querySelectorAll('.logout-btn');

  if (isLoggedIn) {
    profileLinks.forEach((link) => link.classList.remove('hidden'));

    signInBtns.forEach((btn) => btn.classList.add('hidden'));
    logoutBtns.forEach((btn) => {
      btn.classList.remove('hidden');
      btn.addEventListener('click', setLogoutListener);
    });
  } else {
    profileLinks.forEach((link) => link.classList.add('hidden'));

    signInBtns.forEach((btn) => btn.classList.remove('hidden'));
    logoutBtns.forEach((btn) => btn.classList.add('hidden'));
  }
}

if (document.readyState === 'loading') {
  // had to add this if statement to make it work in safari.
  document.addEventListener('DOMContentLoaded', updateMenuState);
} else {
  updateMenuState();
}
