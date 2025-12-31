import { json, error } from '@sveltejs/kit';


/******************************
* retrieve a list of settings *
*******************************
*/
export async function GET({ locals, url }) {
  let type = url.searchParams.get('type');
  // call supabase
  let promise = locals.supabase.from("setting").select();
  if (type) {
    promise.eq("type", type);
  }
  const { data } = await promise;
  let settings = data ?? [];
  return json({ settings });
}