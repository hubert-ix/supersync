<script>
  import { fade } from 'svelte/transition';

  let { children, filterPanel } = $props();
</script>


<div class="wrap">

  <div class="toolbar" in:fade>
    {@render children?.()}
  </div>

  {@render filterPanel?.()}

</div>


<style>
  .wrap {
    margin-bottom: 1rem;
  }
  
  .toolbar {
    display: flex;
    align-items: center;
  }

  :global(.toolbar-item) {
    display: flex;
    align-items: center;
    height: 3.5rem;
    padding: 1rem;
    margin-right: 0.5rem;
    background-color: #e4c1f9;
    border-radius: 0.5rem;
  }

  :global(.toolbar-item.last) {
    flex: 1;
    margin-right: 0;
  }

  :global(.toolbar-item.search) {
    background-color: #e4c1f9;
  }
</style>