import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    wasm(),
    topLevelAwait()
  ],
  resolve: {
    alias: {
      "@": "/src", // Absolute imports from `src/`
    },
  },
  // Ensure that WASM files are included in the asset pipeline
  assetsInclude: ["**/*.wasm"],
  optimizeDeps: {
    exclude: ["@/lib/solver/_solver.js"], // Prevent Vite from pre-bundling
  },
  build: {
    rollupOptions: {
      external: ["@/lib/solver/_solver.js"], // Treat _solver.js as an external file
    },
  },
});
