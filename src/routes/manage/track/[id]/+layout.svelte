<script>
  import { page } from '$app/stores';
  import { invalidate } from '$app/navigation';
  import Banner from "$lib/structure/Banner.svelte";
  import SideNav from "$lib/structure/SideNav.svelte";
  
  let { data, children } = $props();
  
  let project = data.project;
  let segment = $derived($page.url.pathname.split("/")[4]);
  let basePath = "/manage/project/" + data.project.id;
  let navOptions = [
    {href: basePath, label: 'Details', value: ''},
    {href: basePath + '/checklists', label: 'HSE documents', value: 'checklists'},
    {href: basePath + '/courses', label: 'Courses', value: 'courses'},
    {href: basePath + '/team-members', label: 'Team members', value: 'team-members'},
    {href: basePath + '/participants', label: 'Participants', value: 'participants'},
    {href: basePath + '/close-out', label: 'Training close-out', value: 'close-out'},
  ];
  if (data.currentUser.type == "administrator") {
    navOptions.push ({href: basePath + '/settings', label: 'Settings', value: 'settings'});
  }
</script>


<Banner title="Edit project" width="huge" />

<div class="container width-huge">
  <div class="sheet width-xlarge">

    <div class="nav-columns">
      <SideNav {navOptions} selectedValue={segment} type="side" />
      <div class="column-main">
        {@render children?.()}
      </div>
    </div>

  </div>
</div>
