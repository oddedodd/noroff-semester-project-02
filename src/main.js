/**
 * Main application entry point
 * @module main
 */

import './style.css';

import router from './js/router';
import { updateMenuState } from './js/utilities/menuState.js';

await router(window.location.pathname);

/**
 * Mobile menu elements
 * @type {HTMLElement} mobileMenuButton - Button that toggles mobile menu
 * @type {HTMLElement} mobileMenu - Mobile menu container
 * @type {HTMLElement} menuIcon - Hamburger menu icon
 * @type {HTMLElement} closeIcon - Close menu icon
 * @type {HTMLElement} header - Page header element
 */
const mobileMenuButton = document.querySelector('#mobile-menu-button');
const mobileMenu = document.querySelector('#mobile-menu');
const menuIcon = document.querySelector('#menu-icon');
const closeIcon = document.querySelector('#close-icon');
const header = document.querySelector('header');

/**
 * Toggle mobile menu visibility and header styles
 * @listens click
 */
mobileMenuButton.addEventListener('click', function () {
  mobileMenu.classList.toggle('hidden');
  menuIcon.classList.toggle('hidden');
  closeIcon.classList.toggle('hidden');
  header.classList.toggle('sticky');
  header.classList.toggle('top-0');
  header.classList.toggle('z-50');
});

/**
 * Initialize menu state when DOM content is loaded
 * @listens DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', () => {
  updateMenuState();
});
