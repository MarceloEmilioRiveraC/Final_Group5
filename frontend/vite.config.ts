import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

/**
 * Vite Config - Build Configuration
 * 
 * WHY @tailwindcss/vite: Required for Tailwind CSS v4 to work properly.
 * This plugin processes @tailwind directives at build time, replacing them
 * with the compiled CSS. Without it, @tailwind rules won't be recognized.
 */
export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      '@app':            path.resolve(__dirname, 'src/app'),
      '@domain':         path.resolve(__dirname, 'src/domain'),
      '@application':    path.resolve(__dirname, 'src/application'),
      '@infrastructure': path.resolve(__dirname, 'src/infrastructure'),
      '@presentation':   path.resolve(__dirname, 'src/presentation'),
      '@shared':         path.resolve(__dirname, 'src/shared'),
    }
  }
})