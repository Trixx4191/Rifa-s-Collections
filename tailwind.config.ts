import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /**
         * Ink and paper. `black` and `white` are remapped to the theme's ink
         * and paper, so every `text-black`, `bg-white`, `border-black/10` in the
         * app follows the palette in globals.css without a component changing.
         */
        black: "rgb(var(--ink-rgb) / <alpha-value>)",
        white: "rgb(var(--paper-rgb) / <alpha-value>)",

        /**
         * Neutral, warmed a touch to sit on paper rather than pure white. The
         * storefront uses ink, paper and one grey (500); the rest of the ramp
         * exists for the admin's panels and tables.
         */
        soft: {
          50: "#fcf7f5",
          100: "#f6ecea",
          200: "#ecdcd8",
          300: "#dbc6c3",
          400: "#b29aa0",
          500: "#9a8288",
          600: "#6a5459",
          700: "#3a2a2e",
          800: "#2f2125",
          900: "#23181b"
        },

        /** The brand's dusty rose — used sparingly. */
        rose: "#d6a9ae",

        clay: "#9a8288",
        gold: "#a8822c",
        "vienna-green": "#4f6b4c",
        "vienna-red": "#b3261e"
      },
      fontFamily: {
        // Display: the wordmark, headings and product names. Set in layout.tsx.
        serif: ["var(--font-serif)", "Cormorant Garamond", "Georgia", "Times New Roman", "serif"],
        // Labels, prices, controls and running copy. Set in layout.tsx.
        sans: ["var(--font-sans)", "Jost", "-apple-system", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
        // A system monospace, for codes and SKUs in the admin.
        mono: ["ui-monospace", "SF Mono", "Menlo", "Consolas", "monospace"],
        // The admin's face, loaded only by the admin layout.
        grotesque: ["var(--font-grotesque)", "-apple-system", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"]
      },
      // Tailwind's default `spacing` and `fontSize` scales are never redefined.
      // Overriding a key like `4` or `sm` rewrites every `p-4` / `text-sm` in the
      // app at once — this has bitten once already. The look lives in the tokens
      // in globals.css.
      maxWidth: {
        container: "1800px",
        // Measure for the few paragraphs the site sets. Monospace runs wide, so
        // this is narrower than it would be for a proportional face.
        copy: "30rem"
      },
      transitionTimingFunction: {
        apple: "cubic-bezier(0.25, 0.1, 0.25, 1)",
        "apple-out": "cubic-bezier(0.16, 1, 0.3, 1)"
      },
      transitionDuration: {
        700: "700ms"
      }
      // Deliberately absent: `borderRadius` (the system is square; Tailwind's
      // own `rounded-full` covers the few genuinely circular things), and
      // `animation`/`keyframes` (Tailwind only emits keyframes when a matching
      // `animate-*` utility appears in the source, so they live in globals.css
      // beside the classes that use them).
    }
  },
  plugins: []
};

export default config;
