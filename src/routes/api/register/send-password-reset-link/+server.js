import { PUBLIC_APP_URL } from '$env/static/public';
import { error, json } from '@sveltejs/kit';
import { sendEmail } from '$lib/functions/functions.js';
import * as api from '$lib/api';


/**************************
* send password reset link
**************************
- email
*/
export async function POST({ fetch, request }) {
  const values = await request.json();
  // retrieve the user
  let response = await api.get(fetch, "/api/users", {
    email: values.email
  });
  if (response.users.length) {
    let user = response.users[0];
    // get the notification template
    let resp = await api.get(fetch, "/api/notification_templates/reset_password");
    let template = resp.template;
    // substitute variables
    let resetLink = PUBLIC_APP_URL + "/actions/reset-password?t=" + user.id;
    let emailContent = template.content;
    emailContent = emailContent.replace("{%link%}", resetLink);
    emailContent = emailContent.replace("{%first_name%}", user.first_name);
    emailContent = emailContent.replace("{%last_name%}", user.last_name);
    // send email
    sendEmail(values.email, template.subject, emailContent);
  }
  return json({});
}