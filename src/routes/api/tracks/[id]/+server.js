import { json, error } from '@sveltejs/kit';
import dayjs from 'dayjs';
import * as api from '$lib/api';


/**************************
* retrieve a single track *
***************************/
export async function GET({ locals, params, url }) {
  let response = await locals.supabase.from('track').select('*, libraries:library(*)').eq('id', params.id);
  let track = response.data[0];
  return json({ track });
}


/*****************
* update a track *
******************/
export async function PATCH({ locals, params, request, fetch }) {
  const values = await request.json();
  let allowedProps = ["album_id", "libraries", "status", "title"];
  for (let key in values) {
    if (!allowedProps.includes(key)) {
      console.log("Prop " + key + " is not allowed");
      error(403, "Prop " + key + " is not allowed");
    }
  }
  let libraries = values.libraries;
  delete values.libraries;
  // update the track
  await locals.supabase.from('track').update(values).eq('id', params.id);
  // update libraries links
  await locals.supabase.from('library_track').delete().eq('track_id', params.id);
  for (let i in libraries) {
    await locals.supabase.from("library_track").insert({track_id: params.id, library_id: libraries[i]});
  }
  return json({});
}


/*****************
* delete a track *
******************/
export async function DELETE({ locals, params }) {
  await locals.supabase.from('track').delete().eq('id', params.id);
  return json({})
}
