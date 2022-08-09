module.exports = {
	content: ['./src/**/*.{html,ts}'],
	theme: {
		extend: {},
	},
	plugins: [
		require("tailwindcss-animation-delay"),
		require('tailwind-scrollbar-hide'),
	],
};
