<script>
  import { page } from '$app/stores';
  import Banner from "$lib/structure/Banner.svelte";
  import SideNav from "$lib/structure/SideNav.svelte";

  let { children } = $props();
  let segment = $derived($page.url.pathname.split("/")[4]);
  let navOptions = [
    {href: '/admin/settings/super-admin', label: 'Settings', value: ''},
    {href: '/admin/settings/super-admin/builtin-sections', label: 'Built-in page sections', value: 'builtin-sections'},
    {href: '/admin/settings/super-admin/custom-sections', label: 'Custom page sections', value: 'custom-sections'},
  ];
</script>


<Banner title="Super admin" backLink="/admin/settings" width="huge" />

<div class="container width-huge">
  <div class="sheet width-xlarge">
    <div class="nav-columns">
      <SideNav {navOptions} selectedValue={segment} />
      <div class="column-main">
        {@render children?.()}
      </div>
    </div>
  </div>
</div>
