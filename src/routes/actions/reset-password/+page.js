import { error } from '@sveltejs/kit';
import * as api from '$lib/api';


export async function load({ fetch, url }) {
  let token = url.searchParams.get("t");
  // check if the token is valid
  let response = await api.get(fetch, "/api/users/" + token, {column: "id"});
  if (!response.user) {
    throw error(403, "Invalid token");
  }
  return { pageTitle: "Reset your password", token }
}

