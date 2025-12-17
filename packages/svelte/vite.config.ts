import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: "/lbac2025/svelte/",
  build: {
    outDir: path.resolve("../../docs/svelte"),
  },
});
