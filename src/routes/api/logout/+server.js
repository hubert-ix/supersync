import { json } from '@sveltejs/kit';
import * as api from '$lib/api';


export const POST = async({ locals, fetch }) => {
  // record the log
  let historyItem = {
    title: "Logged out",
    type: "general",
  }
  await api.post(fetch, "/api/logs", historyItem);
  const { error } = await locals.supabase.auth.signOut();
  return json({ error });
} 
