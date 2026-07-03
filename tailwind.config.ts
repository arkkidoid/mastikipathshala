import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — warm, elegant, kid-friendly
        cream: "#FFF9F2", // warm off-white background
        ink: "#12354A", // deep navy from the logo wordmark
        orange: {
          DEFAULT: "#FF7A3D",
          soft: "#FFB27A",
          tint: "#FFF0E6",
        },
        sun: {
          DEFAULT: "#FFC63D",
          soft: "#FFD97A",
          tint: "#FFF7E0",
        },
        sky: {
          DEFAULT: "#42B6E8",
          soft: "#8FD6F2",
          tint: "#E6F6FD",
        },
        mint: {
          DEFAULT: "#3FC79A",
          soft: "#8CE0C4",
          tint: "#E6F9F1",
        },
        grape: {
          DEFAULT: "#9B7BE8",
          soft: "#C4B0F2",
          tint: "#F1ECFD",
        },
        rose: {
          DEFAULT: "#FF6F91",
          tint: "#FFEAF0",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(18, 53, 74, 0.16)",
        "soft-lg": "0 24px 70px -20px rgba(18, 53, 74, 0.22)",
        glow: "0 12px 40px -8px rgba(255, 122, 61, 0.45)",
        card: "0 4px 24px -8px rgba(18, 53, 74, 0.12)",
      },
      backgroundImage: {
        "hero-mesh":
          "radial-gradient(1200px 600px at 15% 10%, rgba(255,198,61,0.28), transparent 55%), radial-gradient(900px 600px at 85% 15%, rgba(66,182,232,0.22), transparent 55%), radial-gradient(1000px 700px at 60% 100%, rgba(63,199,154,0.20), transparent 55%)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "float-slow": {
          "0%,100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(4deg)" },
        },
        wiggle: {
          "0%,100%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(4deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        wiggle: "wiggle 3s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
