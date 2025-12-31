import { error } from '@sveltejs/kit';

export async function load({ parent }) {
  const { currentUser } = await parent();
  // make sure that the user is a super admin
  if (!currentUser.permissions.super_admin) {
    error(403, "You don't have permission to access this page");
  }
  return { pageTitle: "Administration" };
}
