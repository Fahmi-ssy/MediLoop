import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      fontSize: {
        'responsive-sm': 'clamp(0.8rem, 2vw, 1rem)',
        'responsive-base': 'clamp(1rem, 2.5vw, 1.25rem)',
        'responsive-lg': 'clamp(1.25rem, 3vw, 1.5rem)',
        'responsive-xl': 'clamp(1.5rem, 4vw, 2rem)',
        'responsive-2xl': 'clamp(2rem, 5vw, 3rem)',
      },
    },
  },
  plugins: [],
};
export default config;
