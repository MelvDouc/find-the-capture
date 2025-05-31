import { join as pathJoin } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/find-the-capture/",
  server: {
    allowedHosts: true
  },
  resolve: {
    alias: {
      "$": pathJoin(import.meta.dirname, "src")
    }
  },
});