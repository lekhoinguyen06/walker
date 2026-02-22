import { tailwindConfig } from '@repo/tailwind-config/tailwind';

export default {
  ...tailwindConfig,
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
};
