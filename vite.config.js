import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import nightwatchPlugin from 'vite-plugin-nightwatch'
import {shouldNewDOMAPIBeUsed} from './lib/react_utils.js';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['react', shouldNewDOMAPIBeUsed() ? 'react-dom/client' : 'react-dom']
  },
  plugins: [
    react(),
    nightwatchPlugin({
      componentType: 'react'
    })
  ]
})
