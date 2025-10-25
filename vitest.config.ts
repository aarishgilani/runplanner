import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    environment: 'node', // Changed from 'jsdom' to 'node' since we're testing a utility class
    globals: true,
    setupFiles: ['./test/setup.ts'],
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, './app'),
    },
  },
})