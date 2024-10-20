/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}", // ระบุว่า Tailwind จะสแกนไฟล์ .js, .jsx, .ts, .tsx ภายในโฟลเดอร์ src ทั้งหมด
    "./src/components/**/*.{js,jsx}", // เพิ่ม path ของไฟล์ JSX ภายในโฟลเดอร์ components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
