import { PUBLIC_APP_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';
import { sendEmail } from '$lib/functions/functions.js';
import * as api from '$lib/api';


/******************
* register a user *
*******************
customer_id:          the stripe customer id
email:                the user's email address
first_name:           the user's first name
last_name:            the user's last name,
membership_id:        the id of the chosen membership
price_id:             the id of the price for that membership (0 if the membership is free)
registration_method:  "social" or "email",
*/
export async function POST({ fetch, locals, request }) {
  const values = await request.json();
  values.action = "register";
  let response = await api.post(fetch, "/api/users", values);
  let userId = response.new_id;
  return json({});
}