// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/api": {
//         target: "https://publicity-poster-backend.vercel.app",
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ""),
//       },
//     },
//   },
//   build: {
//     outDir: "dist",
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           vendor: ["react", "react-dom", "react-router-dom"],
//         },
//         chunkFileNames: "assets/js/[name]-[hash].js",
//         entryFileNames: "assets/js/[name]-[hash].js",
//         assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
//       },
//     },
//   },
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://publicity-poster-backend.vercel.app",
        changeOrigin: true,
        // No rewrite here — keep the /api prefix intact
      },
    },
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
  },
});
