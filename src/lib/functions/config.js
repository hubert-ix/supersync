export default {
  
  drupal_base_url: import.meta.env.VITE_DRUPAL_URL,
  site_name: import.meta.env.VITE_SITE_NAME,
  
  max_nodes: 18,
  max_users: 18,
  max_admin_items: 20,
  snackbar_timeout: 10000,
  skeletons_delay: 1000,

  // system roles
  superAdminRoleId: 1,
  adminRoleId: 2,
  baseRoleId: 3,
  anonymousRoleId: 4,

  infinite_scroll_options: {
    rootMargin: '0px 0px 300px',
    threshold: 0,
  },
  
  admin_date_options: [
    {id: "today", name: "Today"},
    {id: "yesterday", name: "Yesterday"},
    {id: "last-7-days", name: "Last 7 days"},
    {id: "last-30-days", name: "Last 30 days"},
    {id: "last-week", name: "Last week"},
    {id: "last-month", name: "Last month"},
    {id: "all-time", name: "All time"},
    {id: "custom", name: "Custom"}
  ],
  
  superAdminSettings: [
    {id: "enable_social_login", label: "Social login", value: "no"},
    {id: "enable_activities", label: "Activities", value: "no"},
    {id: "enable_groups", label: "Groups", value: "no"},
    {id: "enable_posts", label: "Posts", value: "no"},
    {id: "enable_discussions", label: "Discussions", value: "no"},
    {id: "enable_organisations", label: "Organisations", value: "no"},
    {id: "enable_search", label: "Search", value: "no"},
    {id: "enable_messages", label: "Private messages", value: "no"},
    {id: "enable_display_name", label: "Display name", value: "no"},
  ],

  permissionCategories: [
    {id: "checklist", label: "Checklist", settingDependency: "none" },
    {id: "client", label: "Client", settingDependency: "none" },
    {id: "course", label: "Course template", settingDependency: "none" },
    {id: "course_template", label: "Course template", settingDependency: "none" },
    {id: "exam", label: "Exam", settingDependency: "none" },
    {id: "project", label: "Project", settingDependency: "none" },
    {id: "page", label: "Page", settingDependency: "none" },
  ],

  userTypes: [
    {id: "participant", label: "Participant"},
    {id: "team-member", label: "Team member"},
    {id: "administrator", label: "System administrator"},
    {id: "project-administrator", label: "Project administrator"},
  ],

  examStatuses: [
    {id: "pending", label: "To do"},
    {id: "passed", label: "Passed"},
    {id: "failed", label: "Failed"},
  ],

  checklistItemTypes: [
    {value: "checkbox", label: "Checkbox"},
    {value: "yesno", label: "Yes/No"},
    {value: "text_input_single", label: "Text input (single line)"},
    {value: "text_input_multiple", label: "Text input (multiple lines)"},
    {value: "text_input_rich", label: "Rich text"},
    {value: "cqc", label: "Capacity/Quantity/Checked"},
    {value: "ahc", label: "Activity/Hazards/Control"},
  ],

  competencyAssessmentReportItemTypes: [
    {value: "text_input_single", label: "Text input (single line)"},
    {value: "text_input_multiple", label: "Text input (multiple lines)"},
    {value: "level", label: "Assessment level"},
    {value: "competency", label: "Competency"},
  ],

  practicalAssessmentItemTypes: [
    {value: "text_input_single", label: "Text input (single line)"},
    {value: "text_input_multiple", label: "Text input (multiple lines)"},
    {value: "yesno", label: "Yes/No"},
    {value: "passed_failed", label: "Competency"},
  ],

  locationTypes: [
    {id: "training-centre", name: "OEL Training Centre"},
    {id: "client-site", name: "Client site"},
    {id: "vessel", name: "Vessel/Offshore platform"},
    {id: "mobilisation", name: "Point of mobilisation"},
  ],

}
