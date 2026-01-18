/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Open Sans', 'Outfit', 'sans-serif'],
                heading: ['Montserrat', 'Nexa Bold', 'sans-serif'],
            },
            colors: {
                brand: {
                    deep: '#001122',
                    navy: '#003366',
                    primary: '#4d94ff', // Lighter blue for dark mode
                    dim: '#94a3b8',
                    white: '#f8fafc'
                }
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        },
    },
    plugins: [],
}
