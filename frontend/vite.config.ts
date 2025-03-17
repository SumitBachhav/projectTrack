import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // "server": { "proxy": { "/api": "http://localhost:4000" } }
  "server": { "proxy": { "/": "https://ez4070gwe8.execute-api.ap-south-1.amazonaws.com/prod" } }
})
