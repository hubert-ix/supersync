import { json, error } from '@sveltejs/kit';


/****************************
* retrieve a list of albums *
*****************************
- limit: the maximum number of results
- page: the page to return
- sort_by: the property by which to sort the results
- sort_order: "asc" or "desc" (if it's anything other than "desc", it's "asc")
- search: will search the title
*/
export async function GET({ locals, url }) {
  // gather the parameters
  let limit = url.searchParams.get('limit') ?? 100;
  let page = url.searchParams.get('page') ?? 1;
  let sort_by = url.searchParams.get('sort_by') ?? 'title';
  let sort_order = url.searchParams.get('sort_order') ?? 'asc';
  let search = url.searchParams.get('search');
  let start = (page - 1) * limit;
  let end = parseInt(start) + parseInt(limit) - 1;
  // call supabase
  let promise = locals.supabase
    .from("album")
    .select()
    .order(sort_by, { ascending: (sort_order == "asc") })
    .range(start, end)
  if (search) {
    promise.ilike('title', '%'+search+'%');
  }
  let response = await promise;
  let albums = response.data ?? [];
  // figure out the pagination
  let next_page = (albums.length >= limit)?parseInt(page) + 1:false;
  let pagination = { next_page };
  return json({ albums, pagination });
}


/*********************
* create a new album *
**********************/
export async function POST({ locals, request }) {
  const values = await request.json();
  let libraries = values.libraries
  delete values.libraries;
  let response = await locals.supabase.from("album").insert(values).select();
  if (response.error) {
    error(403, response.error.message);
  }
  let newId = response.data[0].id;
  return json({ new_id: newId });
}
