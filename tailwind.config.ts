import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        granny: "hsl(var(--granny))",
        santa: "hsl(var(--santa))",
        "mucsy-laci": "hsl(var(--mucsy-laci))",
        "heizler-zalan": "hsl(var(--heizler-zalan))",
        "szabo-agoston": "hsl(var(--szabo-agoston))",
        "simai-botond": "hsl(var(--simai-botond))",
        fortnite: "hsl(var(--fortnite))",
        thanos: "hsl(var(--thanos))",
        "tota-oliver": "hsl(var(--tota-oliver))",
        "jakab-istvan": "hsl(var(--jakab-istvan))",
        "battle-glow": "hsl(var(--battle-glow))",
        levente: "hsl(var(--accent))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "punch-left": {
          "0%": { transform: "translateX(0) scale(1) rotate(0deg)" },
          "30%": { transform: "translateX(-80px) scale(1.15) rotate(-10deg)" },
          "50%": { transform: "translateX(-100px) scale(1.2) rotate(-15deg)" },
          "70%": { transform: "translateX(-80px) scale(1.15) rotate(-10deg)" },
          "100%": { transform: "translateX(0) scale(1) rotate(0deg)" },
        },
        "punch-right": {
          "0%": { transform: "translateX(0) scale(1) rotate(0deg)" },
          "30%": { transform: "translateX(80px) scale(1.15) rotate(10deg)" },
          "50%": { transform: "translateX(100px) scale(1.2) rotate(15deg)" },
          "70%": { transform: "translateX(80px) scale(1.15) rotate(10deg)" },
          "100%": { transform: "translateX(0) scale(1) rotate(0deg)" },
        },
        "shake": {
          "0%, 100%": { transform: "translateX(0) rotate(0deg)" },
          "10%": { transform: "translateX(-10px) rotate(-5deg)" },
          "20%": { transform: "translateX(10px) rotate(5deg)" },
          "30%": { transform: "translateX(-10px) rotate(-5deg)" },
          "40%": { transform: "translateX(10px) rotate(5deg)" },
          "50%": { transform: "translateX(-8px) rotate(-3deg)" },
          "60%": { transform: "translateX(8px) rotate(3deg)" },
          "70%": { transform: "translateX(-5px) rotate(-2deg)" },
          "80%": { transform: "translateX(5px) rotate(2deg)" },
          "90%": { transform: "translateX(-3px) rotate(-1deg)" },
        },
        "hit-impact": {
          "0%": { transform: "scale(0) rotate(0deg)", opacity: "1" },
          "50%": { transform: "scale(1.5) rotate(180deg)", opacity: "0.8" },
          "100%": { transform: "scale(2) rotate(360deg)", opacity: "0" },
        },
        "damage-pop": {
          "0%": { transform: "translateY(0) scale(0.5)", opacity: "0" },
          "50%": { transform: "translateY(-40px) scale(1.2)", opacity: "1" },
          "100%": { transform: "translateY(-80px) scale(0.8)", opacity: "0" },
        },
        "float-up": {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-100px)", opacity: "0" },
        },
        "victory": {
          "0%, 100%": { transform: "scale(1) rotate(0deg)" },
          "25%": { transform: "scale(1.1) rotate(5deg)" },
          "75%": { transform: "scale(1.1) rotate(-5deg)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "punch-left": "punch-left 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        "punch-right": "punch-right 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        "shake": "shake 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        "victory": "victory 1s ease-in-out infinite",
        "fade-in": "fade-in 0.3s ease-out",
        "hit-impact": "hit-impact 0.5s ease-out",
        "damage-pop": "damage-pop 1s ease-out forwards",
        "float-up": "float-up 1s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
