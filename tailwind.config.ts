import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "PingFang SC",
          "Microsoft YaHei",
          "Helvetica Neue",
          "Arial",
          "sans-serif"
        ]
      },
      colors: {
        ink: "#101010",
        paper: "#f6f5f2",
        muted: "#787878",
        line: "#dedbd4"
      },
      boxShadow: {
        soft: "0 18px 55px rgba(0,0,0,0.08)"
      }
    }
  },
  plugins: []
};

export default config;
