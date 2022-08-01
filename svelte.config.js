import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

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
		files: { serviceWorker: 'src/sw' },
		serviceWorker: { register: true },
		alias: {
			$components: 'src/lib/shared/components',
			$core: 'src/lib/core',
			$data: 'src/lib/data',
			$environment: 'src/environment',
			$graphql: 'src/lib/graphql',
			$layouts: 'src/lib/shared/layouts',
			$models: 'src/lib/models',
			$utils: 'src/lib/utils'
		}
	}
};

export default config;
