import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/datasummary": {
        target: "http://localhost:8080",
      },
      "/projectdata": {
        target: "http://localhost:8080",
      },
    },
  },
});
