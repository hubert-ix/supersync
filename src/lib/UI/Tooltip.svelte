<script>
  let { text, children } = $props();
</script>

<div class="wrapper">
  {@render children?.()}
  <div class="tooltip">{text}</div>
</div>

<style>
  .wrapper {
    position: relative;
    display: inline-block;
  }
  .tooltip {
    position: absolute;
    bottom: -35px;
    left: 50%;
    padding: 2px 6px;
    transform: translateX(-50%) scale(0);
    transition: transform 0.2s ease-in-out;
    transform-origin: top;
    background: #616161e6;
    color: white;
    border-radius: 2px;
    font-size: 12px;
    font-family: Roboto,sans-serif;
    font-weight: 400;
    width: max-content;
  }
  .wrapper:hover .tooltip {
    transform: translateX(-50%) scale(1); 
  }
</style>
