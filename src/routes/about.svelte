<script context="module">
	import { browser, dev } from '$app/env';

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev;

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<div class="content">
	<h1>About this app</h1>

	<p>
		This is a simple chat application built using <a href="https://kit.svelte.dev">SvelteKit</a>. You can make your own by following these steps:
	</p>

	<p>Clone this repository, rename <code>/src/lib/variables.example.js</code> to <code>/src/lib/variables.js</code> and fill the required data. Then run:</p>

	<pre>npm install</pre>
	<p>For development:</p>
	<pre>npm run dev</pre>

	<p>After you done with development, run:</p>
	<pre>npm run build</pre>

</div>

<style>
	.content {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
	}
</style>
