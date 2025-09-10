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
        // Primary brand colors
        primary: {
          50: "#f2f5f8",
          100: "#e6ebf2",
          200: "#bfcdde",
          300: "#99aec8",
          400: "#4d72a2",
          500: "#00357a",
          600: "#00306e",
          700: "#002049",
          800: "#001837",
          900: "#001025",
        },
        // Secondary colors (neutral grays)
        secondary: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        // Success colors (for correct answers, completion)
        success: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
        // Warning colors (for important notices)
        warning: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
        // Error colors (for wrong answers, errors)
        error: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },
        // Additional utility colors
        info: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        // Background variations
        background: {
          // primary: "#ffffff",
          // secondary: "#f8fafc",
          // tertiary: "#f1f5f9",
          primary: "#ffffff",
          secondary: "#f5f5f5",
          tertiary: "#e2e8f0",
        },
        // Text variations
        text: {
          primary: "#0f172a",
          secondary: "#475569",
          tertiary: "#64748b",
          inverse: "#ffffff",
        },
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      fontSize: {
        "2xs": "0.625rem",
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        medium:
          "0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        strong:
          "0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 4px 25px -5px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        xs: "0.125rem",
        sm: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.15s ease-out",
        "bounce-subtle": "bounceSubtle 0.6s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
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
