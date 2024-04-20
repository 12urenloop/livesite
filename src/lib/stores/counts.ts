import type { Count, Position } from "$lib/types";
import { writable } from "svelte/store";

export const counts = writable<Count[]>([]);
export const max_laps = writable(0);
export const notification = writable("");

export const positions = writable<Record<number, Position>>([]);
