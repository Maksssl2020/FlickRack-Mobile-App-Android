/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "custom-white-100": "#E6E6E6",
        "custom-black-100": "#141414",
        "custom-gray-100": "#8c8c8c",
        "custom-gray-200": "#727272",
        "custom-gray-300": "#585858",
        "custom-gray-400": "#404040",
        "custom-gray-500": "#292929",
        "custom-violet-100": "#b1afe7",
        "custom-violet-200": "#9c9ce1",
        "custom-violet-300": "#888ada",
        "custom-violet-400": "#7278d4",
        "custom-violet-500": "#5a66cd",
        "custom-violet-600": "#3e55c6",
        "custom-tonal-gray-100": "#909095",
        "custom-tonal-gray-200": "#76767c",
        "custom-tonal-gray-300": "#5d5d64",
        "custom-tonal-gray-400": "#46454d",
        "custom-tonal-gray-500": "#2f2f38",
        "custom-tonal-gray-600": "#1a1a23",
      },
    },
  },
  plugins: [],
};
