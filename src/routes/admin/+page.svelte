<script>
  import { fade } from 'svelte/transition';
  import { banner } from '$lib/stores/banner';

  let { data } = $props();
  
  $banner = {title: "Administration", backLink: ""};
</script>


<div class="link-boxes" in:fade>
  <a href="/admin/users">Users</a>
</div>