import { error } from '@sveltejs/kit';

export async function load({ parent }) {
  const { currentUser } = await parent();
  // make sure that the user is an administrator
  if (!currentUser.type == "administrator") {
    error(403, "You don't have permission to access this page");
  }
  return { pageTitle: "Administration" };
}
