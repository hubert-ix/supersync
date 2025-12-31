import { json, error } from '@sveltejs/kit';


/*********************
* retrieve a setting *
**********************/
export async function GET({ locals, params }) {
  const { data } = await locals.supabase.from("setting").select().eq('name', params.name);
  let value = null;
  if (data?.length) {
    value = data[0].value;
    
  }
  return json( {value} );
}


/*****************
* update a setting
******************/
export async function PATCH({ locals, params, request }) {
  const values = await request.json();
  // make sure we are allowed to change all props
  let allowedProps = ["value"];
  for (let key in values) {
    if (!allowedProps.includes(key)) {
      console.log("Prop " + key + " is not allowed");
      error(403, "Prop " + key + " is not allowed");
    }
  }
  // check if the setting exists
  const { data } = await locals.supabase.from("setting").select().eq('name', params.name);
  if (!data.length) {
    // if not we create it
    await locals.supabase.from("setting").insert({name: params.name, value: values.value});
  }
  else {
    // if it exists we update it
    await locals.supabase.from("setting").update(values).eq('name', params.name);
  }
  return json({});
}


/*****************
* delete a setting
*****************/
export async function DELETE({ locals, params }) {
  await locals.supabase.from("setting").delete().eq('name', params.name);
  return json({});
}
