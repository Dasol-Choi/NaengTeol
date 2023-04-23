/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        noto: ["Noto"],
        notoLight:["Noto-Light"],
        notoBold:["Noto-Bold"],
        notoMedium:["Noto-Medium"],
      },
      colors: {
        'ourgreen': '#43A99B',
        'ourgreenlight': '#80C599',
        'ourgraylight':'#F2F5F3',
        'ourgraydark':'#737674',
      },
    },

  },
  
  plugins: [],
}

