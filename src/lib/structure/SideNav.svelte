<script>
  import { fade } from 'svelte/transition';
  
  let {
    navOptions = $bindable([]),
    selectedValue = ""
  } = $props();
  </script>


<nav in:fade>
  {#each navOptions as option}
    <div class="item">
      {#if option.href}
        <a data-sveltekit-noscroll class:selected='{selectedValue === option.value}' href={option.href}>{option.label}</a>
      {:else if option.disabled}
        <div class="disabled">{option.label}</div>
      {/if}
    </div>
  {/each}
</nav>


<style>  
  a, div.disabled {
    position: relative;
    color: #9e9e9e;
    outline: none;
    outline-color: transparent;
    text-decoration: none;
    display: flex;
    align-items: center;
    white-space: nowrap;
    padding-top: .75rem;
    padding-bottom: .75rem;
    border-bottom: 2px solid #e0e0e0;
    transition: color .4s;
  }

  a::after, div.disabled::after {
    content: '';
    position: absolute;
    top: 13px;
    right: 0;
    background: url(/images/chevron-right.svg) center right no-repeat;
    background-size: 24px 24px;
    width: 24px;
    height: 24px;
  }
  
  a:hover {
    opacity: 1;
    color: #272759;
  }

  div.disabled {
    opacity: 0.4;
  }
  
  a.selected {
    color: #272759;
  }

  @media screen and (max-width: 767px) {
    a::after, div.disabled::after {
      transform: rotate(90deg);
    }
  }
</style>