import { json, error } from '@sveltejs/kit';


/****************************
* retrieve a list of tracks *
*****************************
- limit: the maximum number of results
- page: the page to return
- sort_by: the property by which to sort the results
- sort_order: "asc" or "desc" (if it's anything other than "desc", it's "asc")
- search: will search the title
can be filtered by:
- library_id
- album_id
*/
export async function GET({ locals, url }) {
  // gather the parameters
  let limit = url.searchParams.get('limit') ?? 100;
  let page = url.searchParams.get('page') ?? 1;
  let sort_by = url.searchParams.get('sort_by') ?? 'created';
  let sort_order = url.searchParams.get('sort_order') ?? 'desc';
  let sort_foreign = url.searchParams.get('sort_foreign') ?? null;
  let search = url.searchParams.get('search');
  let status = url.searchParams.get('status');
  let library_id = url.searchParams.get('library_id');
  let album_id = url.searchParams.get('album_id');
  let start = (page - 1) * limit;
  let end = parseInt(start) + parseInt(limit) - 1;
  // call supabase
  let select = '*, album(*), library_track(library(*))';
  if (library_id) {
    select = '*, album(*), library_track!inner(library(*))';
  }
  let promise = locals.supabase.from("track").select(select);
  promise = filterPromise(promise, search, status, library_id, album_id, sort_foreign, sort_by, sort_order);
  // range
  promise.range(start, end);
  // count total records
  let promiseCount = locals.supabase.from('track').select(select, { count: 'exact', head: true });
  promiseCount = filterPromise(promiseCount, search, status, library_id, album_id, sort_foreign, sort_by, sort_order);
  let responseCount = await promiseCount;
  let count = responseCount.count;
  // get tracks
  let response = await promise;
  let tracks = response.data ?? [];
  // tidy up libraries
  for (let i in tracks) {
    tracks[i].libraries = [];
    for (let j in tracks[i].library_track) {
      tracks[i].libraries.push(tracks[i].library_track[j].library);
    }
    delete(tracks[i].library_track);
  }
  // figure out the pagination
  let next_page = (tracks.length >= limit)?parseInt(page) + 1:false;
  let pagination = { next_page };
  return json({ tracks, pagination, count });
}

function filterPromise(promise, search, status, library_id, album_id, sort_foreign, sort_by, sort_order) {
  if (search) {
    promise.ilike('title', '%'+search+'%');
  }
  if (status) {
    promise.eq("status", status);
  }
  if (library_id) {
    promise.eq('library_track.library_id', library_id);
  }
  if (album_id) {
    promise.eq('album_id', album_id);
  }
  // sorting
  if (sort_foreign && sort_foreign != "null") {
    console.log("Foreign key sorting", sort_by, sort_foreign, sort_order)
    promise.order(sort_by, { foreignTable: sort_foreign, ascending: (sort_order == "asc") })
  }
  else {
    promise.order(sort_by, { ascending: (sort_order == "asc") })
  }
  return promise;
}


/*********************
* create a new track *
**********************/
export async function POST({ locals, request }) {
  const values = await request.json();
  let libraries = values.libraries
  delete values.libraries;
  let response = await locals.supabase.from("track").insert(values).select();
  if (response.error) {
    error(403, response.error.message);
  }
  let newId = response.data[0].id;
  // link libraries
  for (let i in libraries) {
    await locals.supabase.from("library_track").insert({track_id: newId, library_id: libraries[i]});
  }
  return json({ new_id: newId });
}
