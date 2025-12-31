<script>
  /**
   * @typedef {Object} Props
   * @property {string} [width]
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props} */
  let { width = "", children } = $props();
</script>


<div class="floating-bar">
  <div class="floating-bar-buttons">
    {@render children?.()}
  </div>
</div>


<style>
  /*
  .floating-bar {
    border-top: 1px solid #e0e0e0;
    background-color: #eee;
    position: fixed;
    top: auto;
    bottom: 0%;
    left: 0%;
    right: 0%;
    padding: 2rem 0;
    z-index: 10;
  }
  */

  .floating-bar-buttons {
    grid-column-gap: 0.5rem;
    grid-row-gap: 0.5rem;
    display: flex;
    align-items: center;
  }
</style>