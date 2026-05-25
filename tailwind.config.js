/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.html", // ルートにあるhtml
    "./src/*.html", // src直下にあるhtml（create.htmlなど） ←これが重要！
    "./src/**/*.{js,ts,jsx,tsx,html}", // src内のサブフォルダも含む全ファイル
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 15px 2px rgba(79, 70, 229, 0.4)",
      },
    },
  },
  plugins: [],
};
