<script>
  import { page } from '$app/stores';
  import { banner } from '$lib/stores/banner';
  import { breadcrumbs } from '$lib/stores/breadcrumbs';
  import Banner from "$lib/structure/Banner.svelte";
  import SideNav from "$lib/structure/SideNav.svelte";
  
  let { data, children } = $props();
  
  let navOptions = $state([
    {href: '/admin/users', label: 'Users', value: 'users'},
  ]);
  let segment = $derived($page.url.pathname.split("/")[2]?$page.url.pathname.split("/")[2]:"");
  let isSubPage = $derived($page.url.pathname.split("/")[3] !== undefined);
  let isLandingPage = $derived((segment == ""));

  $banner = {title: "Administration", backLink: ""};
  $breadcrumbs = null;
</script>


<Banner title={$banner.title} width="huge" backLink={$banner.backLink} />

<div class="container width-huge">
  <div class="sheet">
    
    <div class="nav-columns">
      {#if !isSubPage && !isLandingPage}
      <SideNav {navOptions} selectedValue={segment} type="side" />
      {/if}
      <div class="column-main">
        {@render children?.()}
      </div>
    </div>

  </div>
</div>
