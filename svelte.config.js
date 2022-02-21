import { resolve } from 'path';
import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import icons from 'unplugin-icons/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					$components: resolve('.', './src/lib/shared/components'),
					$layouts: resolve('.', './src/lib/shared/layouts'),
					$models: resolve('.', './src/lib/models'),
					$data: resolve('.', './src/lib/data'),
					$core: resolve('.', './src/lib/core'),
					$utils: resolve('.', './src/lib/utils')
				}
			},
			plugins: [
				icons({
					compiler: 'svelte'
				})
			]
		}
	}
};

export default config;
