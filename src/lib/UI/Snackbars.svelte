<script>
  import { flip } from 'svelte/animate';
  import { scale, fade } from 'svelte/transition';
  import { snackbarStore } from '$lib/stores/snackbarMessages';
  import Snackbar from '$lib/UI/Snackbar.svelte';
  
  function undoMessage(message) {
    deleteMessage(message);
  }
  
  function deleteMessage(message) {
    snackbarStore.deleteMessage(message)
  }
</script>


<div class="snackbars">
  {#each $snackbarStore as message (message.id)}
    <div animate:flip={{duration: 400}}>
      <Snackbar {message} {deleteMessage} {undoMessage} />
    </div>
  {/each}
</div>


<style>
  .snackbars {
    position: fixed;
    left: 20px;
    bottom: 20px;
    z-index: 10;
    }
</style>