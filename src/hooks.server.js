import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createServerClient } from '@supabase/ssr';

export const handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      get: (key) => event.cookies.get(key),
      set: (key, value, options) => {
        event.cookies.set(key, value, { ...options, path: '/' })
      },
      remove: (key, options) => {
        event.cookies.delete(key, { ...options, path: '/' })
      },
    },
  })

  const getSessionAndUser = async () => {
    const response  = await event.locals.supabase.auth.getUser();
    let user = response.data?.user;
    let error = response.error;
    let session;
    if (error) {
      return { session, user: null }
    }
    else {
      session = (await event.locals.supabase.auth.getSession()).data?.session;
    }
    return {session, user};
  }

  const {session, user} = await getSessionAndUser();
	event.locals.session = session;
	event.locals.currentUser = user;

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range'
    },
  })
}