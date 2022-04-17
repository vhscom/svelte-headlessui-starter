const tailwindcss = require('tailwindcss');
const nesting = require('tailwindcss/nesting');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const prod = process.env.NODE_ENV === 'production';

const config = {
	plugins: [
		nesting,
		tailwindcss,
		autoprefixer,
		prod &&
			cssnano({
				preset: 'default'
			})
	]
};

module.exports = config;
