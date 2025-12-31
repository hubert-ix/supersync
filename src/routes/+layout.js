import { redirect } from '@sveltejs/kit';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createBrowserClient, isBrowser, parse } from '@supabase/ssr';

export const load = async ({ fetch, data, depends, url }) => {
  depends('supabase:auth')
  const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    global: { fetch },
    cookies: {
      get(key) {
        if (!isBrowser()) {
          return JSON.stringify(data.session);
        }
        const cookie = parse(document.cookie);
        return cookie[key];
      },
    },
  });
  // redirect to sign in page if not logged in
  let allowedPaths = [
    "/login",
    "/actions/forgot-password",
    "/actions/reset-password",
  ]
  if (!data.currentUser.loggedIn && !allowedPaths.includes(url.pathname)) {
    redirect(307, "/login");
  }
  return {
    supabase,
    session: data.session,
    currentUser: data.currentUser,
    favicon: data.favicon
  }
}