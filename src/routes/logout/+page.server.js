import { redirect } from '@sveltejs/kit';
import * as api from '$lib/api';


export async function load({ fetch }) {
  await api.post(fetch, "/api/logout");
  return {}
}