import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        steel: {
          DEFAULT: "#4F6A86", // Coastal Steel
          deep: "#36506B",
          mist: "#869EB6", // Heritage Mist
          fog: "#C9D4E0",
        },
        oak: {
          DEFAULT: "#B8895E", // Driftwood Oak
          deep: "#8C6440",
          soft: "#E5D2BD",
        },
        cream: {
          DEFAULT: "#F4EFE6", // Tide Foam
          deep: "#EAE2D2",
        },
        paper: "#FBF8F2",
        charcoal: {
          DEFAULT: "#1F2428", // Anchor Charcoal
          mid: "#4A5158",
          soft: "#7B8189",
        },
        line: "#D9D2C2",
      },
      fontFamily: {
        script: ["var(--font-script)", "cursive"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "720px",
        quote: "780px",
        shell: "1200px",
      },
      letterSpacing: {
        eyebrow: "0.28em",
        nav: "0.12em",
        button: "0.18em",
        floors: "0.55em",
        cover: "0.24em",
      },
    },
  },
  plugins: [],
};

export default config;
