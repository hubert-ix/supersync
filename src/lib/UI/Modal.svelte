<script>
  import { preventDefault } from 'svelte/legacy';
  import { fade, fly } from 'svelte/transition';
  
  let {
    title = null,
    style = "",
    showCloseButton = false,
    children,
    close,
    show
  } = $props();
</script>


<div class="modal-backdrop" transition:fade onintroend={show}>

  <div class="modal {style}" transition:fly={{y: 300}}>
  
    {#if title}
      <h1>{title}</h1>
    {/if}
    
    {@render children?.()}
    
    {#if showCloseButton}
      <button onclick={preventDefault(close)} class="close"></button>
    {/if}

  </div>

</div>


<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.75);
    z-index: 10;
    display: grid;
    place-items: center;
  }

  .modal {
    position: relative;
    width: 80%;
    max-width: 600px;
    max-height: 80vh;
    background: #fff;
    border-radius: 5px;
    z-index: 100;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 32px;
    /*overflow-y: auto;*/
  }
  
  .modal.small {
    width: 24rem;
  }
  
  .close {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 0;
    border: none;
    outline: none;
    background: url(/images/icon-close-pink.png) no-repeat;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
</style>