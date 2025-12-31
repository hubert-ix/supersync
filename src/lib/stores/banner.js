import { writable } from 'svelte/store';
export const banner = writable({
  title: "",
  subtitle: "",
  backLink: ""
});
