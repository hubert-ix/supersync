<script>
  import { page } from '$app/stores';
  import { fade } from 'svelte/transition';
  import Banner from "$lib/structure/Banner.svelte";
  import ClientForm from '../ClientForm.svelte';
  
  let backLink = $page.url.searchParams.get("returnURL") ?? "/manage/create";
</script>


<Banner title="Create client" width="huge" {backLink} />

<div class="container width-huge" in:fade>
  <div class="sheet width-large">
    <ClientForm />
  </div>
</div>
  