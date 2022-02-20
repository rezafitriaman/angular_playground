const colors = require('tailwindcss/colors');

module.exports = {
	content: ['./src/**/*.{html,js,ts}'],

	theme: {
		extend: {
			colors: {
				green: colors.emerald,
				yellow: colors.amber,
				purple: colors.violet,
				gray: colors.neutral,
			},
		},
	},
	plugins: [],
};
