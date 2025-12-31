import config from '$lib/functions/config.js';
import * as api from '$lib/api';

export async function load({ locals, fetch }) {

  let favicon = "/favicon.png";

  // check if we have a logged in user
  let currentUser = { 
    loggedIn: false,
    permissions: {} 
  };
  if (locals.currentUser) {
    // if we have a supabase user, load the user profile
    let response = await api.get(fetch, "/api/users/" + locals.currentUser.id, {column: "id"});
    if (response.user) {
      currentUser = response.user;
      currentUser.loggedIn = true;
    }
  }

  return {
    session: locals.session,
    currentUser,
    favicon
  };
}
