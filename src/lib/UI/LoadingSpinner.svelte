<script>
  /**
   * @typedef {Object} Props
   * @property {string} [size]
   * @property {string} [style]
   */

  /** @type {Props} */
  let { size = "medium", style = "" } = $props();
</script>

<div class="spinner {size} {style}"></div>

<style>
  .spinner {
    position: relative;
    width: 80px;
    height: 80px;
  }

  .spinner:before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80px;
    height: 80px;
    margin-top: -40px;
    margin-left: -40px;
    border-radius: 50%;
    border-top: 2px solid var(--color-secondary);
    border-right: 2px solid transparent;
    animation: spinner .6s linear infinite;
  }

  .spinner.small {
    width: 20px;
    height: 20px;
  }

  .spinner.small:before {
    width: 20px;
    height: 20px;
    margin-top: -10px;
    margin-left: -10px;
  }
  
  .spinner.white:before {
    border-color: #fff;
  }
  
  @keyframes spinner {
    to {transform: rotate(360deg);}
  }
</style>
