import { writable } from 'svelte/store';

export const picks = writable({ start: null, end: null });
export const draft = writable(null);
