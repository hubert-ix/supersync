<script>
  import { onMount } from 'svelte';

  let { url, loaded } = $props();
  
  let script = $state();

  onMount(async () => {
    script.addEventListener('load', () => {
      loaded();
    })

    script.addEventListener('error', (event) => {
      console.error("something went wrong", event);
    });
  });
</script>


<svelte:head>
  <script bind:this={script} src={url}></script>
</svelte:head>
