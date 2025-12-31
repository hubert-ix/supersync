<script>
  /**
   * @typedef {Object} Props
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props} */
  let { children } = $props();
</script>

<div class="buttons">
  {@render children?.()}
</div>


<style>
  .buttons {
    display: flex;
    align-items: center;
    grid-gap: 1rem;
    margin-bottom: 2rem;
  }
</style>