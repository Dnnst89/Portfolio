/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
        colors: {
            aquamarine: '#67C3AD',
            lightblue: '#67C3AD',
            pink: '#ff49db',
            yellow: '#FFD000',
            orange: '#ff7849',
            resene: '#F6EEE2',
            floralwhite: '#F9F6F0',
            white: '#FFFFFF',
            black: '#000000',
        },
        fontFamily: {
            sans: ['Poppins', 'sans-serif'],
            serif: ['Merriweather', 'serif'],
        },
    },
    plugins: [],
};
