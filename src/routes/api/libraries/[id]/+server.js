import { json, error } from '@sveltejs/kit';
import dayjs from 'dayjs';
import * as api from '$lib/api';


/****************************
* retrieve a single library *
****************************/
export async function GET({ locals, params, url }) {
  let response = await locals.supabase.from('library').select().eq('id', params.id);
  let library = response.data[0];
  return json({ library });
}


/*******************
* update a library *
*******************/
export async function PATCH({ locals, params, request, fetch }) {
  const values = await request.json();
  let allowedProps = ["name"];
  for (let key in values) {
    if (!allowedProps.includes(key)) {
      console.log("Prop " + key + " is not allowed");
      error(403, "Prop " + key + " is not allowed");
    }
  }
  // update the library
  await locals.supabase.from('library').update(values).eq('id', params.id);
  return json({});
}


/*******************
* delete a library *
*******************/
export async function DELETE({ locals, params }) {
  await locals.supabase.from('library').delete().eq('id', params.id);
  return json({})
}
