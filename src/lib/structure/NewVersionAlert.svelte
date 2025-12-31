<script>
  import { run } from 'svelte/legacy';

  import { updated } from '$app/stores';
  import { snackbarStore } from '$lib/stores/snackbarMessages';

  let showDiv = false;
  let showSnackbar = true;

  run(() => {
    if ($updated && showSnackbar) {
      snackbarStore.addMessage("A new version of the site is available<br /><a href='" + location.href + "' data-sveltekit-reload>Load the new version</a>");
    }
  });
</script>


{#if $updated && showDiv}
  <div class="wrap" data-sveltekit-reload>
    A new version of the site is available<br />
    <a href="/">Load the new version</a>
  </div>
{/if}


<style>
  .wrap {
    position: absolute;
    z-index: 300;
    top: 150px;
    right: 50px;
    border: solid 1px #f00;
    background: #fff;
    padding: 1rem;
    text-align: left;
  }
</style>