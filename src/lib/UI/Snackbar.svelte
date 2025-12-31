<script>
  import { scale, fade } from 'svelte/transition';
  import { snackbarIndex } from '$lib/stores/snackbarIndex.js';
  import { snackbarLastRemovedMessage } from '$lib/stores/snackbarLastRemovedMessage.js';
  import { snackbarLastUndoMessage } from '$lib/stores/snackbarLastUndoMessage.js';
  import config from "$lib/functions/config.js";
  
  let { message, deleteMessage, undoMessage } = $props();
  
  $snackbarIndex++;
  
  let timeout = setTimeout(function() {
    $snackbarLastRemovedMessage = message;
    deleteMessage(message);
  }, config.snackbar_timeout)
  
  function undo() {
    $snackbarLastUndoMessage = message;
    clearTimeout(timeout);
    undoMessage(message);
  }
</script>


<div class="snackbar" in:scale out:fade="{{ duration: 400 }}">

  <div class="snackbar-text">
    {@html message.caption}
  </div>
  
  {#if message.enableUndo}
  <div class="snackbar-action" onclick={undo}>
    undo
  </div>
  {/if}
  
</div>


<style>
  .snackbar {
    color: #fff;
    display: flex;
    justify-content: space-between;
    text-align: left;
    padding: 12px 16px;
    width: 350px;
    flex-grow: 1;
    flex-wrap: wrap;
    align-items: center;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    border-radius: 4px;
    margin-top: 12px;
    background-color: rgb(50, 50, 50);
    box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.05), 0px 6px 5px 0px rgba(0,0,0,0.05), 0px 1px 5px 0px rgba(0,0,0,0.05);
  }
  
  .snackbar-action {
    text-transform: uppercase;
    cursor: pointer;
  }
</style>