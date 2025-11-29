import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/<REPO_NAME>/', // TODO: Replace <REPO_NAME> with your GitHub repository name
})
