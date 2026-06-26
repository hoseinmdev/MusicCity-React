import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "MusicCity",
        short_name: "MusicCity",
        description: "Stream and discover music with 30-second previews",
        theme_color: "#171717",
        background_color: "#171717",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
        runtimeCaching: [
          {
            // Cache iTunes API responses for 5 minutes
            urlPattern: /\/itunes\//,
            handler: "NetworkFirst",
            options: {
              cacheName: "itunes-api",
              expiration: { maxEntries: 50, maxAgeSeconds: 300 },
            },
          },
          {
            // Cache artwork images for 7 days
            urlPattern: /\/imagecdn\//,
            handler: "CacheFirst",
            options: {
              cacheName: "artwork-images",
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 7 },
            },
          },
        ],
      },
    }),
  ],
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
