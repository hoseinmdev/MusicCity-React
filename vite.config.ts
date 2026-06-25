import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      "/itunes": {
        target: "https://itunes.apple.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/itunes/, ""),
      },
      "/audio": {
        target: "https://audio-ssl.itunes.apple.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/audio/, ""),
      },
      "/imagecdn": {
        target: "https://is1-ssl.mzstatic.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/imagecdn/, ""),
      },
    },
  },
});
