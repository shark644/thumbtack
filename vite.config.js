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
