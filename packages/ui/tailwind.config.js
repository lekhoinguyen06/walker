import { tailwindConfig } from '@repo/tailwind-config/tailwind';

export default {
  ...tailwindConfig,
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
};
