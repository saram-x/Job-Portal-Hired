import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// Vite configuration with React plugin and path aliases
export default defineConfig({
  plugins: [react()],
  resolve: {
