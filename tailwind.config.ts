import type { Config } from 'tailwindcss';

export default {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                lightSky: '#84baf5',
                tableHover: '#cbecfb',
                lightYellow: '#edd51c',
                lightBlue: '#99a2de',
                paleYellow: '#ded895',
                lightBrown: '#3b261e',
            },
        },
    },
    plugins: [],
} satisfies Config;
