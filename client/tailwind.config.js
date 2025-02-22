/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,ts,jsx,tsx}"], // Adjust paths based on your project structure
    theme: {
        container: {
            padding: '2rem',
            center: true
        },
        extend: {
            fontFamily: {
                roboto: ["Roboto", "sans-serif"],
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        "prettier-plugin-tailwindcss"
    ],
};
