import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { NgmiPolyfill } from "vite-plugin-ngmi-polyfill";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), NgmiPolyfill()],
});
