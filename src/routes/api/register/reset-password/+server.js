import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SECRET_SUPABASE_SERVICE_KEY } from '$env/static/private';
import { error, json } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';


/**********************
* reset user's password
**********************/
export async function POST({ fetch, request }) {
  const values = await request.json();
  const supabase = createClient(PUBLIC_SUPABASE_URL, SECRET_SUPABASE_SERVICE_KEY);
  const { data, error } = await supabase.auth.admin.updateUserById( values.token, { password: values.password });
  console.log(data, error)
  return json({});
}