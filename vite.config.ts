import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { stho_vite } from './src/lib/lang/stholite_for_svelte';

export default defineConfig({
        plugins: [
			stho_vite(),
			sveltekit()]
});

