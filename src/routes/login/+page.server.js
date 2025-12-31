import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  // if the user is already logged in return them to the home page
  if (locals.session) {
    throw redirect(303, '/');
  }
  return { pageTitle: "Sign in" }
}