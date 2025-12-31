<script>
  import { fade } from "svelte/transition";
  import Banner from "$lib/structure/Banner.svelte";
  import Button from "$lib/UI/Button.svelte";
  import ClientForm from '../ClientForm.svelte';

  let { data } = $props();
</script>


<Banner title="Edit client" width="huge" />

<div class="container width-huge" in:fade>
  <div class="sheet width-large">

    <div class="edit-button">
      <Button caption="View client details" type="contained" style="yellow" icon="view" href={data.client.path} />
    </div>

    <ClientForm client={data.client} />

  </div>
</div>