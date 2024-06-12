import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    target: 'es2021', // Ensures the target environment supports ECMAScript 2021 features
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
  },
  build: {
    outDir: 'build',
  },
});
