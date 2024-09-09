import { withTV } from "tailwind-variants/transformer"
import type { Config } from "tailwindcss"

const config = withTV({
  // darkMode: "media",
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{ts,tsx,js,jsx}",
    "./public/**/*.{html,js,json,css,svg}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fira_code: ["var(--font-fira-code)"],
        roboto_slab: ["var(--font-roboto-slab)"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
}) satisfies Config

export default config
