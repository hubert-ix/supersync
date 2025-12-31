import { json, error } from '@sveltejs/kit';
import dayjs from 'dayjs';
import * as api from '$lib/api';


/**************************
* retrieve a single album *
***************************/
export async function GET({ locals, params, url }) {
  let response = await locals.supabase.from('album').select().eq('id', params.id);
  let album = response.data[0];
  return json({ album });
}


/*****************
* update a album *
******************/
export async function PATCH({ locals, params, request, fetch }) {
  const values = await request.json();
  let allowedProps = ["album_id", "title"];
  for (let key in values) {
    if (!allowedProps.includes(key)) {
      console.log("Prop " + key + " is not allowed");
      error(403, "Prop " + key + " is not allowed");
    }
  }
  // update the album
  await locals.supabase.from('album').update(values).eq('id', params.id);
  return json({});
}


/*****************
* delete a album *
******************/
export async function DELETE({ locals, params }) {
  await locals.supabase.from('album').delete().eq('id', params.id);
  return json({})
}
