/** @type {import('@sveltejs/kit').Config} */
import preprocess from 'svelte-preprocess'
import node from '@sveltejs/adapter-node';

const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: node()
	},
	preprocess: preprocess({})
};

export default config;
