import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      process: {
        env: {
          REACT_APP_CLERK_PUBLISHABLE_KEY: env.REACT_APP_CLERK_PUBLISHABLE_KEY,
        },
      },
    },
    plugins: [react()],
  };
});
