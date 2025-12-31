<script>
  import { fade, slide } from 'svelte/transition';
  
  let {
    label = "",
    labelLink = null,
    id = "",
    errorMessage = "",
    style = "",
    description = null,
    children
  } = $props();
</script>


<div class="form-item {style}">
  
  {#if label}
    <div class="label">
      <label for="{id}">{@html label}</label>
      {#if labelLink}
        <span class="label-link">
          {labelLink}
        </span>
      {/if}
    </div>
  {/if}
  
  {#if description}
    <div class="description">
      {@html description}
    </div>
  {/if}
  
  <div class="item">
    {@render children?.({ id, })}
  </div>
  
  {#if errorMessage}
    <div class="error" in:slide out:fade>
      {errorMessage}
    </div>
  {/if}
  
</div>


<style>
  .form-item {
    margin-bottom: 1.5rem;
    position: relative;
  }
  
  .form-item.no-margin {
    margin: 0;
  }
  
  .form-item.small-margin {
    margin-bottom: 8px;
  }

  .label {
    display: flex;
    grid-gap: 1rem;
    margin-bottom: 0.5rem;
  }

  label {
    color: #272759;
    font-size: .875rem;
  }

  .label-link {
    border-bottom: dashed 1px #2f96887a;
    color: #2f9688;
    font-size: 0.875rem;
    cursor: pointer;
  }
  
  .description {
    margin-top: -8px;
    margin-bottom: 8px;
    font-size: .875rem;
    line-height: 20px;
  }

  .error {
    margin-top: 8px;
    color: #f44336;
    font-size: 13px;
    line-height: 20px;
  }
  
  .item {
    position: relative;
  }
</style>