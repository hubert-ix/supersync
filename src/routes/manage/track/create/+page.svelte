<script>
  import { page } from '$app/stores';
  import { fade } from 'svelte/transition';
  import Banner from "$lib/structure/Banner.svelte";
  import TrackForm from '../../../TrackForm.svelte';
  
  let backLink = $page.url.searchParams.get("returnURL") ?? "/";
</script>


<Banner title="Create a formidable track" width="huge" />

<div class="container width-huge" in:fade>
  <div class="sheet width-large">
    <TrackForm />
  </div>
</div>
  