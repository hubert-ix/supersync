<script>
  import { slide } from 'svelte/transition';
  import Chip from "$lib/UI/Chip.svelte";
  
  let { options, selectedOptions = $bindable([]), filter } = $props();
    
  let classColumns = "col" + options.length;
  
  function selectOption(type, optionId) {
    selectedOptions[type] = [...selectedOptions[type], optionId];
    filter(selectedOptions);
  }
  
  function removeOption(type, optionId) {
    let index = selectedOptions[type].indexOf(optionId);
    selectedOptions[type].splice(index, 1);
    filter(selectedOptions);
  }
  
  function isOptionSelected(type, optionId) {
    return (selectedOptions[type].includes(optionId));
  }
</script>


<div class="filter-dropdown" transition:slide>
  {#each options as category}
    <div class="filter-dropdown-column">
      {#if options.length > 1}
        <div class="filter-dropdown-header">{category.label}</div>
      {/if}
      <div class="filter-dropdown-list">
        {#each category.data as option}
          <Chip 
            text={option.name}
            style="blue"
            optionId={option.id} 
            selectable=true 
            selected={isOptionSelected(category.type, option.id)} 
            whenSelected={() => selectOption(category.type, option.id)} 
            whenRemoved={() => removeOption(category.type, option.id)} />
        {/each}
      </div>
    </div>
  {/each}
</div>


<style>
  .filter-dropdown {
    display: flex;
    grid-gap: 1.5rem;
    padding-top: 2rem;
    margin-bottom: 3rem;
  }
  
  .filter-dropdown-header {
    margin-bottom: 0.5rem;
    color: #272759;
    font-size: .875rem;
  }
  
  .filter-dropdown-list {
    display: flex;
    grid-row-gap: 0.5rem;
    flex-wrap: wrap;
  }
  
  @media only screen and (max-width: 767px) {
    .filter-dropdown {
      padding-bottom: 0;
      flex-direction: column;
    }
    
    .filter-dropdown-column {
      margin-bottom: 0;
    }
    
    .filter-dropdown.col2, .filter-dropdown.col3  {
      grid-template-columns: 1fr;
    }
  }
</style>