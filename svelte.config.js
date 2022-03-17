import { resolve } from 'path';
import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

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
		vite: {
			resolve: {
				alias: {
					$components: resolve('.', './src/lib/shared/components'),
					$layouts: resolve('.', './src/lib/shared/layouts'),
					$models: resolve('.', './src/lib/models'),
					$data: resolve('.', './src/lib/data'),
					$core: resolve('.', './src/lib/core'),
					$utils: resolve('.', './src/lib/utils'),
					$environment: resolve('.', './src/environment')
				}
			},
			plugins: [
				icons({
					compiler: 'svelte',
					customCollections: {
						custom: FileSystemIconLoader('./static/assets/icons', (svg) =>
							svg.replace(/^<svg /, '<svg fill="currentColor" ')
						)
					}
				})
			]
		}
	}
};

export default config;
