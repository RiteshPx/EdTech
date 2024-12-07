/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primay : '#106EBE',
        secondary :"#0FFCBE",
        btnHighlight : "#FCA311",  //Warm Yellow)
        neutralBackground :"#F3F4F6",   //Light Gray)
        textColor : "#1F2937", // (Dark Gray)
        ctaBtn: "#FF5C93" ,  // (Vivid Pink)

      }
    },
  },
  plugins: [],
}

