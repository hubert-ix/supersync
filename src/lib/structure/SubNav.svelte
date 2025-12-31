<script>
  import { goto } from '$app/navigation';
  import { fade } from 'svelte/transition';
  import SelectDropdown from '$lib/UI/SelectDropdown.svelte';
  import ContextMenu from '$lib/UI/ContextMenu.svelte';
  import Button from '$lib/UI/Button.svelte';
  
  let {
    width = "huge",
    type = "menu",
    navOptions = $bindable([]),
    contextMenuOptions = null,
    contextMenuResponse = empty(),
    selectedValue = ""
  } = $props();
  
  // add class for icons (if any)
  for (let i in navOptions) {
    if (navOptions[i].icon) {
      navOptions[i].classIcon = "icon " + navOptions[i].icon;
    }
  }

  function empty() {
  }
  
  function navigate(href) {
    goto(href, {noscroll: true});
  }
</script>


<nav class="{type}" in:fade>
  <div class="container width-{width}">
    <div class="desktop">
      {#each navOptions as option}
        <div class="item">
          {#if option.href}
            <a data-sveltekit-noscroll class:selected='{selectedValue === option.value}' class={option.classIcon} href={option.href}>{option.label}</a>
          {:else if option.disabled}
            <div class="disabled">{option.label}</div>
          {:else}
            <Button caption={option.label} icon={option.icon} type="text" on:click={() => contextMenuResponsed(option.action)} />
          {/if}
        </div>
      {/each}
      {#if contextMenuOptions}
        <div class="context-menu">
          <ContextMenu options={contextMenuOptions} onOptionSelected={(option) => contextMenuResponse(option)} />
        </div>
      {/if}
    </div>
    <div class="mobile">
      <SelectDropdown options={navOptions} {selectedValue} returnHref={true} icon="menu" change={navigate} />
    </div>
  </div>
</nav>


<style>  
  nav {
    margin: 0;
    padding: 0;
    border-bottom: 1px solid var(--color-borders-light);
    display: flex;
    height: 4rem;
    /*view-transition-name: subnav;*/
  }

  .item {
    border-right: 1px solid var(--color-borders-light);
    margin: 0 -1px 0 0;
  }

  .item:first-child {
    border-left: 1px solid var(--color-borders-light);
  }

  nav a, nav div.disabled {
    position: relative;
    color: #000;
    outline: none;
    outline-color: transparent;
    text-decoration: none;
    height: 4rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    transition: box-shadow 0.2s;
  }
  
  nav a:hover {
    opacity: 1;
    box-shadow: inset 0 -2px 0 0 #bdbdbd;
  }

  nav div.disabled {
    opacity: 0.4;
  }
  
  nav a.selected, nav div.item.selected {
    box-shadow: inset 0 -2px #000;
  }
  
  nav .container {
    position: relative;
  }
  
  .context-menu {
    padding-left: 12px;
  }
  
  .desktop {
    display: flex;
    align-items: center;
  }
  
  .mobile {
    display: none;
    margin-left: 8px;
  }
  
  @media only screen and (max-width: 992px) {
    nav.people .container {
      left: 0px;
    }
  }
  
  @media only screen and (max-width: 767px) { 
     .desktop {
      display: none;
    }
    
     .mobile {
      display: flex;
      align-items: center;
      height: 64px;
    }
  }
</style>