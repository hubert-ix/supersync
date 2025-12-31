import * as api from '$lib/api';

export async function load({ fetch, parent, depends }) {
  let [response1, response2] = await Promise.all([
    api.get(fetch, "/api/libraries"),
    api.get(fetch, "/api/albums"),
  ]);
  let libraries = response1.libraries;
  let albums = response2.albums;
  return { libraries, albums, pageTitle: "Welcome" };
}