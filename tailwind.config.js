/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
      },
      colors: {
        background: '#050505',
        foreground: '#E0E0E0',
        card: '#0C0C0C',
        'card-foreground': '#E0E0E0',
        popover: '#0C0C0C',
        'popover-foreground': '#E0E0E0',
        primary: {
          DEFAULT: '#5E5CEE',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#4DABF7',
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#FF8787',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#1A1A1A',
          foreground: '#888888',
        },
        border: '#1A1A1A',
        input: '#1A1A1A',
        ring: '#5E5CEE',
        destructive: {
          DEFAULT: "hsl(0 84% 60%)",
          foreground: "hsl(0 0% 100%)",
        },
        success: "hsl(142 70% 56%)",
        warning: "hsl(45 100% 62%)",
        error: "hsl(0 84% 60%)",
        "black-pure": "#000000",
        "black-soft": "#0A0A0A",
        "black-lighter": "#111111",
        "blue-light": "#4DABF7",
        purple: "#9775FA",
        coral: "#FF8787",
      },
      borderRadius: {
        lg: "0.75rem",
        md: "calc(0.75rem - 2px)",
        sm: "calc(0.75rem - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'shimmer': 'shimmer 2s infinite linear',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
