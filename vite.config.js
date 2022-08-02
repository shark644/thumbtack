import { fileURLToPath } from "url";
import { resolve, dirname } from "path";
import { defineConfig } from "vite";

const __fileName = fileURLToPath(import.meta.url);
const __DIR__ = dirname(__fileName);

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__DIR__, "index.html"),
        membership: resolve(__DIR__, "membership/index.html"),
        register: resolve(__DIR__, "register/index.html"),
        login: resolve(__DIR__, "login/index.html"),
        // DON'T REMOVE THIS COMMENT! IT IS USED BY newpage SCRIPT
      },
    },
  },
  resolve: {
    alias: {
      "@styles": resolve(__DIR__, "styles"),
      "@component": resolve(__DIR__, "styles/component"),
    },
  },
});
