<script>
  import Dropdown from './Dropdown.svelte';
  
  let { options, style = "", onOptionSelected } = $props();
  let showDropdown = $state(false);

  function toggleDropdown(e) {
    e.stopPropagation();
    showDropdown = !showDropdown;
  }
  
  function selectOption(option) {
    showDropdown = false;
    onOptionSelected(option.value);
  }
</script>


<div class="dropdown {style}">

  <div class="menu-trigger" onclick={toggleDropdown}>
    <svg viewBox="0 0 24 24"><path fill="currentColor" d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2z"></path></svg>
  </div>
  
  <Dropdown 
    {options} 
    show={showDropdown} 
    change={selectOption}
  />

</div>

<svelte:body onclickcapture={() => showDropdown = false} />


<style>
  .dropdown {
    position: relative;
  }
  
  .menu-trigger {
    border-radius: 50%;
    width: 36px;
    height: 36px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color .4s;
  }

  .menu-trigger svg {
    width: 24px;
    min-width: 24px;
    color: #000;
  }
  
  .menu-trigger:hover {
    background-color: #eaeaea;
  }

  .circle .menu-trigger {
    background: #52527a1f;
  }

  .circle .menu-trigger:hover {
    background-color: #52527a3d;
  }

  .white .menu-trigger:hover {
    background: #555;
  }
</style>
