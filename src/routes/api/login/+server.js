import { json } from '@sveltejs/kit';


export const POST = async({ request, locals, fetch }) => {
  let values = await request.json();
  let error = null;
  let response = await locals.supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password
  });
  if (response.error) {
    error = "Wrong email or password";
    return json({ error });
  }
  return json({ error });
} 
