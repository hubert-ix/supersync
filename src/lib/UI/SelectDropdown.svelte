<script>
  import Dropdown from '$lib/UI/Dropdown.svelte';
  
  let {
    options,
    returnHref = false,
    icon = null,
    selectedValue = $bindable(null),
    style = "",
    label = null,
    noActiveState = false,
    change = () => {}
  } = $props();

  let showDropdown = $state(false);
  let selectedOption = $state({label: ""});
  let iconClass = (icon)?"icon-"+icon:"";
  let headerLabel = $state("");

  $effect(() => {
    if (options && options.length) {
      if (selectedValue) {
        headerLabel = options.find(item => item.id == selectedValue)?.label;
      }
      else {
        selectedOption = options[0];
        headerLabel = (label)?label:options[0].label;
      }
    }
  });

  
  function toggleDropdown(e) {
    e.preventDefault();
    e.stopPropagation();
    showDropdown = !showDropdown;
  }
  
  function selectOption(selectedOption) {
    headerLabel = selectedOption.label;
    if (returnHref) {
      selectedValue = selectedOption.href;
    }
    else {
      selectedValue = selectedOption.id;
    }
    change(selectedValue)
  }
</script>


<div class="dropdown {iconClass} {style}">

  <div class="dropdown-header" onclick={toggleDropdown}>
    {#if icon}
      <img src="/images/{icon}" width="24" alt="icon" />
    {/if}
    {@html headerLabel}
  </div>
  
  {#if !noActiveState}
    <Dropdown {options} {style} bind:show={showDropdown} selectedValue={selectedOption.id} change={selectOption} />
  {:else}
    <Dropdown {options} {style} bind:show={showDropdown} change={selectOption} />
  {/if}
  
</div>


<style>
  .dropdown {
    position: relative;
  }
  
  .dropdown-header {
    position: relative;
    color: #000;
    font-size: 1rem;
    line-height: 1.2;
    text-transform: none;
    height: auto;
    padding: 0;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    white-space: nowrap;
  }

  .dropdown-header img {
    margin-right: 0.4rem;
  }

  .form {
    max-width: 768px;
  }
  
  .form .dropdown-header {
    display: block;
    width: 100%;
    min-height: 3.8rem;
    padding: 1rem;
    border: 2px solid var(--color-borders);
    border-radius: .5rem;
    background-color: #fff;
    color: #757575;
    font-family: neue-haas-unica, sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    transition: border 0.3s;
    resize: none;
  }
  
  .form .dropdown-header:after {
    content: '';
    display: block;
    background: url(/images/icon-menu-down.png) no-repeat;
    background-size: 100%;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 16px;
    right: 8px;
  }
  
  @media only screen and (max-width: 767px) {
    .icon-sort .dropdown-header {
      text-indent: -9999px;
    }
  }
</style>