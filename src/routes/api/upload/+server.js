import { json, error } from '@sveltejs/kit';


/****************************
* upload a file to supabase *
****************************/
export async function POST({ locals, request }) {
  const values = await request.json();
  const { data, error } = await locals.supabase.storage.from('files').upload('public/' + values.file.name, values.file, {
    cacheControl: '3600',
    upsert: false
  })
  return json({ data, error })
}