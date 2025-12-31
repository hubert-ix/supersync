import { error } from '@sveltejs/kit';

export async function load({ parent }) {
  const { currentUser } = await parent();
  return { pageTitle: "Create a track" }
}