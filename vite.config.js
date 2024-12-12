import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  appType: "mpa",
  base: "",
  build: {
    target: "esnext",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./index.html"),
        login: resolve(__dirname, "./auth/login/index.html"),
        auth: resolve(__dirname, "./auth/index.html"),
        register: resolve(__dirname, "./auth/register/index.html"),
        profile: resolve(__dirname, "./profile/index.html"),
        updateProfile: resolve(__dirname, "./profile/update/index.html"),
        addListing: resolve(__dirname, "./listings/add/index.html"),
        editListing: resolve(__dirname, "./listings/edit/index.html"),
        viewListing: resolve(__dirname, "./listings/view/index.html"),
      },
    },
  },
});
