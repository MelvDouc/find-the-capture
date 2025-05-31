import { join as pathJoin } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "$": pathJoin(import.meta.dirname, "src")
    }
  }
});