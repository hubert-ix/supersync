import { json, error } from '@sveltejs/kit';


/*********************************
* retrieve a list of permissions *
**********************************
*/
export async function GET({ locals, url }) {
  // call supabase
  let promise = locals.supabase.from("permission").select(`*, roles:role_permission(role_id, allowed)`).order("label");
  const { data } = await promise;
  let permissions = data ?? [];
  return json({ permissions });
}