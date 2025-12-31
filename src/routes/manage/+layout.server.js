import { redirect, error } from '@sveltejs/kit';

export async function load({ parent }) {
  const { currentUser } = await parent();
  // make sure that the user is logged in
  if (!currentUser.loggedIn) {
    redirect(302, "/login");
  }
  return {};
}
