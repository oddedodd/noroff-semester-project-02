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
const header = document.querySelector('header');

mobileMenuButton.addEventListener('click', function () {
  mobileMenu.classList.toggle('hidden');
  menuIcon.classList.toggle('hidden');
  closeIcon.classList.toggle('hidden');
  header.classList.toggle('sticky');
  header.classList.toggle('top-0');
  header.classList.toggle('z-50');
});

document.addEventListener('DOMContentLoaded', () => {
  updateMenuState();
});
