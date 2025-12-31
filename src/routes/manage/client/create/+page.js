import { error } from '@sveltejs/kit';

export async function load({ parent }) {
  const { currentUser } = await parent();
  let canAccess = (currentUser.type == "administrator" || currentUser.type == "project-administrator");
  if (!canAccess) {
    error(403, "You don't have permission to access this page");
  }
  return { pageTitle: "Create client" }
}