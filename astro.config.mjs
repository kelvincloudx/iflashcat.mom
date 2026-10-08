import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://iflashcat.mom',
  output: 'static',
  build: {
    format: 'directory'
  }
});
