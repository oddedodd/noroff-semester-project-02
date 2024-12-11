import { setLogoutListener } from './logout.js';

export function updateMenuState() {
    console.log('updateMenuState');
  const isLoggedIn = localStorage.getItem('username') !== null;

  // Get all relevant elements
  const profileLinks = document.querySelectorAll('.profile-link');
  const signInBtns = document.querySelectorAll('.signin-btn');
  const logoutBtns = document.querySelectorAll('.logout-btn');

  if (isLoggedIn) {
    // Show profile links
    profileLinks.forEach((link) => link.classList.remove('hidden'));

    // Show logout buttons, hide signin buttons
    signInBtns.forEach((btn) => btn.classList.add('hidden'));
    logoutBtns.forEach((btn) => {
      btn.classList.remove('hidden');
      btn.addEventListener('click', setLogoutListener);
    });
  } else {
    // Hide profile links
    profileLinks.forEach((link) => link.classList.add('hidden'));

    // Show signin buttons, hide logout buttons
    signInBtns.forEach((btn) => btn.classList.remove('hidden'));
    logoutBtns.forEach((btn) => btn.classList.add('hidden'));
  }
}

// Call this function when the page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateMenuState);
} else {
  updateMenuState();
}
