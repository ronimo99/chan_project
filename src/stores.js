import { writable } from 'svelte/store';
export const reply_box_toggle = writable(0);
export const reply_box_coords = writable({ x: 300, y: 300});