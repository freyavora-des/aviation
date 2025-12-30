import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        skybrand: {
          50: "#eff8ff",
          100: "#d9efff",
          200: "#b3dfff",
          300: "#7bc7ff",
          400: "#3aa9ff",
          500: "#0b87ff",
          600: "#006be0",
          700: "#0052ad",
          800: "#003e84",
          900: "#00356f",
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(11,135,255,0.25), 0 12px 40px rgba(0, 64, 150, 0.15)",
      },
    },
  },
  plugins: [],
} satisfies Config;

