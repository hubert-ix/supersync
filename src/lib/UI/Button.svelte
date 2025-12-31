<script>
  import { createBubbler } from 'svelte/legacy';

  const bubble = createBubbler();
  import Ripple from '$lib/UI/Ripple.svelte';
  import LoadingSpinner from '$lib/UI/LoadingSpinner.svelte';
 
  let {
    caption = "",
    disabled = false,
    type = "outlined",
    icon = null,
    href = "",
    target = null,
    width = "",
    height = "",
    src = "",
    data = "",
    noSubmit = false,
    noRipple = $bindable(false),
    style = false,
    loading = false,
    iconSize = 24,
    children
  } = $props();
  
  let classIcon = (icon && icon != "")?"icon":"";
  let loadingStyle = (type == "contained")?"white":"";
  
  if (type == "text") {
    noRipple = true;
  }
</script>


{#if href === ""}

  {#if type == "image"}
    <input type="image" {src} {width} {height} {disabled} {data} alt={caption} onclick={bubble('click')} />
  {:else}
    {#if noSubmit}
      <div class="button {disabled} {type} {style} {classIcon}" onclick={bubble('click')}>
        <div class="inside">
          {#if !noRipple}
            <Ripple />
          {/if}
          {#if icon}
            <img src={iconSrc} width={iconSize} class="icon" alt="icon" />
          {/if}
          {#if !loading}
            <div class="caption">{caption}{@render children?.()}</div>
          {:else}
            <div class="loading">
              <LoadingSpinner size="small" style={loadingStyle} />
            </div>
          {/if}
        </div>
      </div>
    {:else}
      <button type="submit" class="{type} {style} {classIcon}" {disabled} {data} onclick={bubble('click')}>
        <div class="inside">
          {#if !noRipple}
            <Ripple />
          {/if}
          {#if icon}
            <img src="/images/{icon}" width={iconSize} class="icon" alt="icon" />
          {/if}
          {#if !loading}
            <div class="caption">{caption}{@render children?.()}</div>
          {:else}
          <div class="loading">
            <LoadingSpinner size="small" style={loadingStyle} />
          </div>
          {/if}
        </div>
      </button>
    {/if}
  {/if}
  
{:else}

  <a href="{href}" class="{type} {style} {classIcon}" {disabled} {data} {target}>
    <div class="inside">
      {#if !noRipple}
        <Ripple />
      {/if}
      {#if icon}
        <img src="/images/{icon}" width={iconSize} class="icon" alt="icon" />
      {/if}
      {#if !loading}
        <div class="caption">{caption}{@render children?.()}</div>
      {:else}
        <div class="loading">
          <LoadingSpinner size="small" style={loadingStyle} />
        </div>
      {/if}
    </div>
  </a>
  
{/if}


<style>
  button, .button, a {
    display: inline-flex; 
    border: 2px solid #0096887a; 
    border-radius: 0.5rem;
    background: none;
    background-color: none;
    transition: background-color 400ms ease, opacity 400ms ease, border-color 400ms ease, color 400ms ease; 
    color: #009688; 
    font-family: var(--font-body);
    font-size: 1rem; 
    line-height: 1.6;
    padding: 0;
    text-decoration: none; 
    cursor: pointer;
    position: relative;
    overflow: hidden;
    height: 3.5rem;
  }
  
  button:hover,
  button:active,
  .button:hover,
  a:hover,
  a:active {
    opacity: 1;
  }

  button:disabled,
  button:disabled:hover,
  button:disabled:active,
  .button.disabled,
  .button.disabled:hover {
    opacity: 0.2 !important;
    cursor: not-allowed;
  }
  
  button:focus, input:focus {
    outline: none;
  }
  
  .inside {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 1rem;
    padding-right: 1.25rem;
    height: 100%;
  }
  
  button:hover, a:hover, .button:hover {
    border-color: #66c0b8;
    color: #66c0b8;
  }

  button.pale, a.pale, .button.pale {
    border-color: #a9a9bd;
  }
  
  button.text, a.text, .button.text {
    color: #000;
    background-color: transparent;
    font-size: 1rem;
    line-height: 1.6;
    font-weight: 400;
    border: none;
    height: auto;
    padding: 0;
  }
  
  button.text:hover, a.text:hover, .button.text:hover {
    background-color: transparent;
    opacity: 1;
  }
  
  .text .inside {
    padding: 0;
    height: auto;
  }
  
  button.contained, a.contained, .button.contained {
    background-color: var(--color-secondary);
    border-color: var(--color-secondary);
    color: #fff;
  }
  
  button.contained:hover, a.contained:hover {
    opacity: 1;
    background-color: #009688;
    border-color: #009688;
  }

  button.contained.yellow, a.contained.yellow {
    background-color: #dec65b;
    border-color: #dec65b;
    color: #212121;
  }

  button.contained.black {
    background-color: #000;
    border-color: #000;
  }
  
  button.block, a.block, .button.block {
    display: block;
  }
  
  button.full-width {
    width: 100%;
  }

  .full-width .inside {
    flex: 1;
  }

  .small {
    height: 3rem;
  }

  .small .inside {
    padding: 0.5rem 1.25rem;
    height: auto;
  }
  
  button.outlined.white, a.outlined.white {
    border-color: #fff;
    color: #fff;
  }
  
  button.outlined.white:hover, a.outlined.white:hover {
    background-color: rgba(252, 228, 236, 0.16);
  }

  .caption {
    white-space: nowrap;
  }
    
  @media only screen and (max-width: 767px) {
    .icon img {
      min-width: 24px;
      margin: 0;
    }
    
    .icon .caption {
      display: none;
    }
    
    .outlined.icon .caption {
      display: block;
    }
    
    button.summary, a.summary, .button.summary {
      margin: 0 auto 8px auto;
    }
  }
</style>