import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SECRET_SUPABASE_SERVICE_KEY } from '$env/static/private';
import { error, json } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import { generateSlug, generateString } from '$lib/functions/functions';
import * as api from '$lib/api';
import dayjs from 'dayjs';


/***************************
* retrieve a list of users *
****************************
- limit: the maximum number of results
- page: the page to return
- sort_by: the property by which to sort the results
- sort_order: "asc" or "desc" (if it's anything other than "desc", it's "asc")
- search: will search the full name
can be filtered by:
- slug
- email
- initials
- type (we can ask for multiple types by separating them with "||")
- project_id
- user_id
- course_id
*/
export async function GET({ locals, url }) {
  // gather the parameters
  let limit = url.searchParams.get('limit') ?? 50;
  let page = url.searchParams.get('page') ?? 1;
  let sort_by = url.searchParams.get('sort_by') ?? 'created';
  let sort_order = url.searchParams.get('sort_order') ?? 'desc';
  let search = url.searchParams.get('search');
  let slug = url.searchParams.get('slug');
  let initials = url.searchParams.get('initials');
  let type = url.searchParams.get('type');
  let email = url.searchParams.get('email');
  let project_id = url.searchParams.get('project_id');
  let course_id = url.searchParams.get('course_id');
  let user_id = url.searchParams.get('user_id');
  let start = (page - 1) * limit;
  let end = parseInt(start) + parseInt(limit) - 1;
  // call supabase
  let select = "*";
  if (project_id) {
    select += ", project_user!inner(*)";
  }
  if (course_id) {
    select += ", enrolment!inner(id)";
  }
  let promise = locals.supabase
    .from("profile")
    .select(select)
    .order(sort_by, { ascending: (sort_order == "asc") })
    .range(start, end)
  if (search) {
    promise = promise.ilike('display_name', '%'+search+'%')
  }
  if (email) {
    promise = promise.eq('email', email)
  }
  if (slug) {
    promise = promise.eq('slug', slug)
  }
  if (initials) {
    promise = promise.eq('initials', initials)
  }
  if (project_id) {
    promise.eq("project_user.project_id", project_id);
    if (type) {
      let arr = type.split("||");
      promise = promise.in('project_user.type', arr);
    }
  }
  else {
    if (type) {
      let arr = type.split("||");
      promise = promise.in('type', arr);
    }
  }
  if (course_id) {
    promise.eq("enrolment.course_id", course_id);
  }
  if (user_id) {
    promise.eq("user_id", user_id);
  }
  let response = await promise;
  let users = response.data ?? [];
  // if we filter by project, we add the display order
  if (project_id) {
    for (let i in users) {
      users[i].display_order = users[i].project_user[0].display_order;
      users[i].project_roles = users[i].project_user[0].roles;
      users[i].registration = users[i].project_user[0];
      delete users[i].project_user;
    }
  }
  // figure out the pagination
  let next_page = (users.length >= limit)?parseInt(page) + 1:false;
  let pagination = { next_page };
  return json({ users, pagination });
}


/********************
* create a new user *
********************/
export async function POST({ fetch, locals, request }) {
  const values = await request.json();
  // generate a dummy email for authentication
  values.email_auth = dayjs().unix() + generateString(4, false) + "@offshore-energy.biz";
  // create the user in auth.users - this will automatically create a profile row with a supabase function/trigger
  const supabase = createClient(PUBLIC_SUPABASE_URL, SECRET_SUPABASE_SERVICE_KEY);
  let response = await supabase.auth.admin.createUser({ email: values.email_auth, email_confirm: true, password: values.password});
  if (response.error) {
    return json ({ error: response.error })
  }
  let userId = response.data.user.id;
  // generate the slug and path
  values.display_name = values.first_name + " " + values.last_name;
  values.slug = generateSlug(values.display_name);
  response = await api.get(fetch, "/api/users", {slug: values.slug});
  let count = response.users.length;
  if (count > 0) {
    values.slug = values.slug + "-" + count;
  }
  values.path = "/people/" + values.slug;
  // generate the user ID
  values.initials = Array.from(values.first_name)[0] + Array.from(values.last_name)[0];
  response = await api.get(fetch, "/api/users", {initials: values.initials});
  count = response.users.length + 1;
  values.user_id = values.initials.toUpperCase() + pad(count, 2);
  // update the profile
  delete values.password;
  delete values.password_confirm;
  response = await locals.supabase.from("profile").update(values).eq("id", userId);
  return json({ new_id: userId, user_id: values.user_id })
}


function pad(toPad, length){
  let padChar = 0;
  return (String(toPad).length < length)
    ? new Array(length - String(toPad).length + 1).join(padChar) + String(toPad)
    : toPad;
}