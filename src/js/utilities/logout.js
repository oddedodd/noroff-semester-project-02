import { Logout } from '../api/auth/logout';

export function setLogoutListener(event) {
  event.preventDefault();
  if (confirm('Are you sure you want to log out?')) {
    Logout();
  }
}
