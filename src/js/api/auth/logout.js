export function Logout() {
    localStorage.clear();
    window.location.href = "/auth/login/";
  }
  