import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    environment: 'jsdom',
    includeSource: ["src/**/*.{ts,js}"]
  }
});