import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SECRET_SUPABASE_SERVICE_KEY } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';
import { error, json } from '@sveltejs/kit';


/**************************
* complete the registration (update the password and change the status from "pending" to "active")
**************************
- user_id
- password
*/
export async function POST({ locals, request }) {
  const values = await request.json();
  await locals.supabase.from("profile").update({status: "active"}).eq("id", values.user_id);
  const supabase = createClient(PUBLIC_SUPABASE_URL, SECRET_SUPABASE_SERVICE_KEY);
  const { data, error } = await supabase.auth.admin.updateUserById( values.user_id, { password: values.password, email_confirm: true });
  return json({});
}