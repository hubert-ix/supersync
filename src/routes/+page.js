import * as api from '$lib/api';

export async function load({ fetch, parent, depends }) {
  let [response1, response2, response3] = await Promise.all([
    api.get(fetch, "/api/libraries"),
    api.get(fetch, "/api/albums"),
    api.get(fetch, "/api/tags"),
  ]);
  let libraries = response1.libraries;
  let albums = response2.albums;
  let tags = response3.tags;
  return { libraries, albums, tags, pageTitle: "Welcome" };
}