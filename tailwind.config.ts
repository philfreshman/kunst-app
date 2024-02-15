import type { Config } from "tailwindcss"

export default {
  content: ["./components/**/*.{js,vue,ts}", "./layouts/**/*.vue", "./pages/**/*.vue"],
  theme: {
    extend: {
      fontFamily: {
        "din-light": ["DIN-Light", "sans-serif"],
        "din-regular": ["DIN-Regular", "sans-serif"],
        "din-medium": ["DIN-Medium", "sans-serif"],
        "din-bold": ["DIN-Bold", "sans-serif"]
      }
    }
  },
  plugins: []
} satisfies Config
