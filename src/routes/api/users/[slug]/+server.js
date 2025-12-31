import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SECRET_SUPABASE_SERVICE_KEY } from '$env/static/private';
import { json, error } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';


/*************************
* retrieve a single user *
**************************
- column: the column to use for [slug] (by default it's "slug")
*/
export async function GET({ locals, params, url }) {
  let table = url.searchParams.get('column') ?? 'slug';
  let response = await locals.supabase.from("user").select(`*`).eq(table, params.slug);
  return json({ user: response.data[0] });
}


/*****************
* update  a user *
*****************/
export async function PATCH({ locals, params, request }) {
  const values = await request.json();
  // make sure we are allowed to change all props
  let allowedProps = [
    "avatar_url", 
    "display_name",
    "email", 
    "first_name", 
    "password",
    "last_name", 
    "status",
  ];
  // go through the data we've received
  for (let key in values) {
    // make sure it's allowed
    if (!allowedProps.includes(key)) {
      error(403, "Prop " + key + " is not allowed");
    }
  }
  // update auth email
  if ("email" in values) {
    const supabase = createClient(PUBLIC_SUPABASE_URL, SECRET_SUPABASE_SERVICE_KEY);
    const { data, error } = await supabase.auth.admin.updateUserById(params.slug, { email: values.email });
    if (error) {
      console.log("ERROR", error)
      return json({ error });
    }
  }
  // update auth password
  if ("password" in values && values.password != "") {
    const supabase = createClient(PUBLIC_SUPABASE_URL, SECRET_SUPABASE_SERVICE_KEY);
    await supabase.auth.admin.updateUserById( params.slug, { password: values.password });
    delete values.password;
    delete values.password_confirm;
  }
  if ("first_name" in values || "last_name" in values) {
    values.display_name = values.first_name + " " + values.last_name;
  }
  // update the user
  let resp = await locals.supabase.from('user').update(values).eq("id", params.slug);
  return json({});
}


/****************
* delete a user *
****************/
export async function DELETE({ locals, params, request }) {
  const supabase = createClient(PUBLIC_SUPABASE_URL, SECRET_SUPABASE_SERVICE_KEY);
  const { data, error } = await supabase.auth.admin.deleteUser(params.slug);
  console.log(data, error)
  return json({});
}
