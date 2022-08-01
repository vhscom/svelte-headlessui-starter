import { sveltekit } from '@sveltejs/kit/vite';
import icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

/** @type {import('vite').UserConfig} */
const config = {
    envPrefix: 'OATH',
    plugins: [
        sveltekit(),
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

export default config;