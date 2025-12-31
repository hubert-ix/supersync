import { error } from '@sveltejs/kit';
import * as api from '$lib/api';

export async function load({ fetch, params, parent, depends }) {
  depends('client');
  const { currentUser } = await parent();
  // make sure the user is allowed to edit this client
  let canAccess = (currentUser.type == "administrator" || currentUser.type == "project-administrator");
  if (!canAccess) {
    error(403);
  }
  // load client
  let response = await api.get(fetch, "/api/clients/" + params.id);
  let client = response.client;
  return {client, pageTitle: "Edit client"}
}
