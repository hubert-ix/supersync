import { error } from '@sveltejs/kit';
import * as api from '$lib/api';

export async function load({ fetch, depends, params, parent }) {
  depends("user");
  const { currentUser } = await parent();
  // make sure the user is allowed to edit this user
  let canAccess = (currentUser.type != "participant");
  if (!canAccess) {
    error(403, "You don't have permission to access this page");
  }
  let response = await api.get(fetch, "/api/users/" + params.id, {column: 'id'});
  let user = response.user;
  return {user, pageTitle: "Edit user"};
}
