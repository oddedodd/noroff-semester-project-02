import './style.css';

import router from './js/router';
import { updateMenuState } from './js/utilities/menuState.js';

await router(window.location.pathname);

/*
 * Mobile menu
 */
const mobileMenuButton = document.querySelector('#mobile-menu-button');
const mobileMenu = document.querySelector('#mobile-menu');
const menuIcon = document.querySelector('#menu-icon');
const closeIcon = document.querySelector('#close-icon');

mobileMenuButton.addEventListener('click', function () {
  mobileMenu.classList.toggle('hidden');
  menuIcon.classList.toggle('hidden');
  closeIcon.classList.toggle('hidden');
});

document.addEventListener('DOMContentLoaded', () => {
    updateAuthButtons();
    updateMenuState();
});
