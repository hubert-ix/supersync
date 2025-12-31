<script>
  import { preventDefault } from 'svelte/legacy';
  import { fly } from 'svelte/transition';
  
  let { showCloseButton = true, close, children } = $props();
</script>


<div class="wrapper" transition:fly={{x: 300}}>

  {@render children?.()}
  
  {#if showCloseButton}
    <button onclick={preventDefault(close)} class="close"></button>
  {/if}

</div>


<style>
  .wrapper {
    position: fixed;
    top: 105px;
    right: 20px;
    z-index: 100;
    min-width: 320px;
    max-width: 500px;
    padding: 32px;
    border: solid 1px #e0e0e0;
    background-color: #fff;
    box-shadow: 1px 1px 3px 0 rgb(0 0 0 / 24%);
    text-align: left;
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