import { json, error } from '@sveltejs/kit';


/************************
* retrieve a single tag *
*************************/
export async function GET({ locals, params, url }) {
  let response = await locals.supabase.from('tag').select().eq('id', params.id);
  let tag = response.data[0];
  return json({ tag });
}


/***************
* update a tag *
****************/
export async function PATCH({ locals, params, request, fetch }) {
  const values = await request.json();
  let allowedProps = ["name"];
  for (let key in values) {
    if (!allowedProps.includes(key)) {
      console.log("Prop " + key + " is not allowed");
      error(403, "Prop " + key + " is not allowed");
    }
  }
  // update the tag
  await locals.supabase.from('tag').update(values).eq('id', params.id);
  return json({});
}


/***************
* delete a tag *
****************/
export async function DELETE({ locals, params }) {
  await locals.supabase.from('tag').delete().eq('id', params.id);
  return json({})
}
