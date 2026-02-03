import react from "@vitejs/plugin-react";
import { join as pathJoin } from "node:path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  base: "/find-the-capture/",
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "$": pathJoin(import.meta.dirname, "src")
    }
  }
});