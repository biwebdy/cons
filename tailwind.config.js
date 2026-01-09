/** @type {import('tailwindcss').Config} */
module.exports = {
    // Important to prevent Tailwind from conflicting with Bootstrap
    important: '.tailwind',
    // Remove the prefix since we're using parent class approach
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                'nunito': ['NunitoSans-Bold', 'sans-serif'],
                'proxima': ['ProximaNova.ttf', 'sans-serif'],
            },
            colors: {
                // 'blue-brand': '#083B5D',
                'blue-brand': '#083B5D',

                'yellow-brand': '#f0bc68',
                'grey-light': '#faf7f6',
                'grey-dark': '#e4dbd6',
            },
        },
    },
    // Disable Tailwind's base styles to prevent conflicts with Bootstrap
    corePlugins: {
        preflight: false,
    },
    plugins: [],
}
