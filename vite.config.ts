import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  // prevent vite from obscuring rust errors
  clearScreen: false,
  // tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true
  },
  // to make use of `TAURI_DEBUG` and other env variables
  // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
  envPrefix: ["VITE_", "TAURI_"],
  build: {
    // Tauri supports es2021
    target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
    // don't minify for debug builds
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG
  },
  resolve: {
    alias: [
      {
        find: "@constants",
        replacement: path.resolve(__dirname, "src/constants")
      },
      {
        find: "@pages",
        replacement: path.resolve(__dirname, "src/pages")
      },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components")
      },
      {
        find: "@interfaces",
        replacement: path.resolve(__dirname, "src/interfaces")
      },
      {
        find: "@services",
        replacement: path.resolve(__dirname, "src/services")
      },
      {
        find: "@utils",
        replacement: path.resolve(__dirname, "src/utils")
      }
    ]
  }
});
