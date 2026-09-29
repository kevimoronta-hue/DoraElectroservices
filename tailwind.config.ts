import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#050303",
        background: "#080808",
        "background-secondary": "#101011",
        surface: "#171719",
        "surface-elevated": "#202023",
        graphite: "#43403F",
        "steel-dark": "#615F5E",
        steel: "#9C9B99",
        silver: "#D8CCC7",
        "red-deep": "#620605",
        "red-dark": "#9C0E0E",
        "red-primary": "#E02423",
        "red-electric": "#F85A4E",
        "red-warm": "#F28D73",
        "text-primary": "#F5F3F2",
        "text-secondary": "#B9B5B2",
        "text-muted": "#85817F",
        success: "#42B883",
        warning: "#F2B544",
        error: "#F85A4E",
      },
      borderColor: {
        DEFAULT: "rgba(216, 204, 199, 0.14)",
        strong: "rgba(224, 36, 35, 0.45)",
      },
      fontFamily: {
        display: ["var(--font-barlow)", "Arial Narrow", "sans-serif"],
        body: ["var(--font-manrope)", "Inter", "sans-serif"],
      },
      maxWidth: {
        container: "1280px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        card: "16px",
        lg: "20px",
      },
    },
  },
  plugins: [],
};

export default config;
