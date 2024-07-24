/** @type {import('tailwindcss').Config} */

import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				coal: 'rgb(var(--color-coal) / <alpha-value>)',
				gold: 'rgb(var(--color-gold) / <alpha-value>)',
				beige: 'rgb(var(--color-beige) / <alpha-value>)',
				charcoal: 'rgb(var(--color-charcoal) / <alpha-value>)',
				plant: 'rgb(var(--color-plant) / <alpha-value>)',
				rose: 'rgb(var(--color-rose) / <alpha-value>)',
				turquoise: 'rgb(var(--color-turquoise) / <alpha-value>)',
				muted: 'rgba(255, 255, 255, 0.4)',
			},
			fontFamily: {
				paytone: ['Paytone One', ...fontFamily.sans],
				outfit: ['Outfit', ...fontFamily.sans],
			},
		},
	},
	plugins: [],
};
