import { redirect } from '@sveltejs/kit';
import * as api from '$lib/api';

export async function load({ fetch, parent, depends }) {
  depends("account");
  const { currentUser } = await parent();
  if (!currentUser.loggedIn) {
    console.log("account page: there is no current user so we redirect to the home page");
    redirect(302, "/");
  }
  let response = await api.get(fetch, "/api/users/" + currentUser.id, {column: "id"});
  let user = response.user;
  return { user, pageTitle: "Account" }
}
