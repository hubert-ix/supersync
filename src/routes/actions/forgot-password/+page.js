import { redirect } from '@sveltejs/kit';

export async function load({ parent }) {
  let { currentUser } = await parent();
  if (currentUser.loggedIn) {
    redirect('/account');
  }
  return { pageTitle: "Forgot password" }
}

