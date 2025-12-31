<script>
  import { fade } from 'svelte/transition';
  import { banner } from '$lib/stores/banner';

  let { data } = $props();
  
  $banner = {title: "Administration", backLink: ""};
</script>


<div class="link-boxes" in:fade>
  <a href="/admin/users">Users</a>
  <a href="/admin/content">Content</a>
  {#if data.currentUser.permissions.super_admin}
    <a href="/admin/settings">Settings</a>
  {/if}
</div>