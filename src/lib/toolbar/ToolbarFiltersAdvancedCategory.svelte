<script>
  import { slide } from 'svelte/transition';
  import Chip from "$lib/UI/Chip.svelte";
  
  let { category, selectedOptions = $bindable([]), filter } = $props();
    
  function selectOption(type, optionId) {
    selectedOptions[category.type] = [...selectedOptions[category.type], optionId];
    filter(selectedOptions);
  }
  
  function removeOption(type, optionId) {
    let index = selectedOptions[category.type].indexOf(optionId);
    selectedOptions[category.type].splice(index, 1);
    filter(selectedOptions);
  }
  
  function isOptionSelected(categoryType, optionId) {
    return (selectedOptions[categoryType].includes(optionId));
  }
</script>


<div class="filter-dropdown" transition:slide>
  <div class="filter-dropdown-list">
    {#each category.data as option}
      <Chip 
        text={option.name}
        style={category.type}
        optionId={option.id} 
        selectable=true 
        selected={isOptionSelected(category.type, option.id)} 
        on:selected={() => selectOption(category.type, option.id)} 
        on:removed={() => removeOption(category.type, option.id)} />
    {/each}
  </div>
</div>


<style>
  .filter-dropdown {
    border-bottom: 1px solid var(--color-borders);
    margin-bottom: 30px;
    padding-bottom: 30px;
    padding-top: 30px;
  }
  
  .filter-dropdown-list {
    display: flex;
    flex-wrap: wrap;
  }
  
  @media only screen and (max-width: 767px) {
    .filter-dropdown {
      display: block;
      padding-bottom: 0;
    }
  }
</style>