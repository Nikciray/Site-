import { defineConfig } from "vite";
import tailwindcss from '@tailwindcss/vite'
import react from "@vitejs/plugin-react";
import vike from "vike/plugin";
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => ({
  plugins: [
    vike(),
    react(),
    tailwindcss(),
    tsconfigPaths()
  ],
  publicDir: "./static",
  dev: {
    sourcemap: true
  },
  build: {
    sourcemap: true,
    minify: true
  },
  server: {
    port: 3004
  },
  preview: {
    port: 3005
  }
}));