import { error } from '@sveltejs/kit';
import * as api from '$lib/api';

export async function load({ fetch, url, params, parent, depends }) {
  depends('project');
  const { currentUser } = await parent();
  // make sure the user is allowed to edit this project
  let canAccess = (currentUser.type != "participant");
  if (!canAccess) {
    error(403);
  }
  // get team members
  let response = await api.get(fetch, "/api/users", {project_id: params.id, type: "team-member||administrator||project-administrator"});
  let teamMembers = response.users;
  // check access permissions
  // admin and project admin can edit everything, and instructors can edit the close-out
  let segment = url.pathname.split("/")[4];
  let userProjectRoles = teamMembers.find(u => u.id == currentUser.id)?.project_roles;
  canAccess = (currentUser.type == "administrator" || currentUser.type == "project-administrator");
  if (segment == "close-out") {
    canAccess = (canAccess || userProjectRoles.includes("instructor"))
  }
  if (!canAccess) {
    error(403);
  }
  // load project
  response = await api.get(fetch, "/api/projects/" + params.id);
  let project = response.project;
  return {project, pageTitle: "Edit project"}
}
