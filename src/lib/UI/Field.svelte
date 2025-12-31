<script>
  let {
    label,
    value = $bindable(),
    style = "",
    alwaysShow = true
  } = $props();
  
  let show = $state(true);

  if (!alwaysShow && (!value || value == "")) {
    show = false;
  }

  if (alwaysShow && (!value || value == "")) {
    value = "--";
  }
</script>


{#if show}
  <div class="field {style}">
    <div class="label">{label}</div>
    <div class="value">{@html value}</div>
  </div>
{/if}


<style>
  .field {
    margin-bottom: 0.5rem;
    background-color: #00968829;
    border-radius: .5rem;
    padding: 1rem;
  }
  
  .label {
    color: #000;
    margin-bottom: .5rem;
    line-height: 1.3;
    font-weight: 600;
  }
</style>