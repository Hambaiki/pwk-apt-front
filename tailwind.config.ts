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
        "jungle-green": {
          50: "#F4FBF9",
          100: "#E9F8F3",
          200: "#C8EDE1",
          300: "#A7E2CF",
          400: "#65CCAC",
          500: "#23B688",
          600: "#20A47A",
          700: "#156D52",
          800: "#10523D",
          900: "#0B3729",
        },
        "nile-blue": {
          50: "#F3F5F6",
          100: "#E8ECEE",
          200: "#C5CFD4",
          300: "#A3B3BA",
          400: "#5D7986",
          500: "#184052",
          600: "#163A4A",
          700: "#0E2631",
          800: "#0B1D25",
          900: "#071319",
        },
        "la-palma": {
          50: "#F4FAF3",
          100: "#E9F5E8",
          200: "#C8E6C5",
          300: "#A7D7A1",
          400: "#66B95B",
          500: "#249B15",
          600: "#208C13",
          700: "#165D0D",
          800: "#104609",
          900: "#0B2F06",
        },
        "green-white": {
          50: "#FEFEFE",
          100: "#FDFDFC",
          200: "#F9FBF8",
          300: "#F5F8F4",
          400: "#EEF2EB",
          500: "#E6EDE3",
          600: "#CFD5CC",
          700: "#8A8E88",
          800: "#686B66",
          900: "#454744",
        },
        accent: "#F472B6",
        neutral: "#374151",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
