import { Logout } from "../api/auth/logout";

export function setLogoutListener(event) {
  event.preventDefault();
  alert("You will be logged out");
  onLogout();
}
