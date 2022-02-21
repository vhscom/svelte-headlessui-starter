const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');
const defaultTheme = require('tailwindcss/defaultTheme');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter var', ...defaultTheme.fontFamily.sans]
			}
		}
	},

	plugins: [forms, typography]
};

module.exports = config;
