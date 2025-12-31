<script>
  import ToolbarFiltersAdvancedCategory from "$lib/toolbar/ToolbarFiltersAdvancedCategory.svelte";
  import Chip from "$lib/UI/Chip.svelte";
    
  let { filterOptions = $bindable(), filter } = $props();
  
  let selectedFilterOptions = $state([]);
  let selectedOptionsForDisplay = $state([]);
  
  // for each option type
  for (let i in filterOptions) {
    // create the selected filters array
    selectedFilterOptions[filterOptions[i].type] = [];
    // mark all filter types to be hidden
    filterOptions[i].isShown = false;
  }
  
  function hideAllCategories() {
    for (let i in filterOptions) {
      filterOptions[i].isShown = false;
    }
  }
  
  function optionSelected(selectedOptions) {
    hideAllCategories();
    // from the selected options we build the selectedOptionsForDisplay array
    // it's a bit laborious - maybe there's a better way to do this
    selectedOptionsForDisplay = [];    
    let ids = [];
    let keys = Object.keys(selectedFilterOptions);
    for (let k in keys) {
      let category = keys[k];
      for (let i in selectedFilterOptions[category]) {
        let optionId = selectedFilterOptions[category][i];
        for (let o in filterOptions) {
          let category = filterOptions[o];
          for (let j in category.data) {
            let option = category.data[j];
            if (option.id == optionId) {
              option.type = category.type;
              selectedOptionsForDisplay = [...selectedOptionsForDisplay, option];
            }
          }
        }
      }
    }
    filter(selectedFilterOptions);
  }
  
  function optionRemoved(optionId) {
    // remove the option from the selected options
    let tempArray = selectedFilterOptions;
    for (let i in selectedFilterOptions) {
      if (selectedFilterOptions[i].length) {
        for (let j in selectedFilterOptions[i]) {
          if (selectedFilterOptions[i][j] == optionId) {
            tempArray[i].splice(j, 1);
          }
        }
      }
    }
    selectedFilterOptions = tempArray;
    // remove the option from the display
    selectedOptionsForDisplay = selectedOptionsForDisplay.filter(obj => obj.id != optionId);
    // fire the filter event
    filter(selectedFilterOptions);
  }
</script>


{#each filterOptions as category}
  {#if category.isShown}
    <ToolbarFiltersAdvancedCategory {category} selectedOptions={selectedFilterOptions} filter={optionSelected} />
  {/if}
{/each}

<!-- the selected filters -->
<div class="selected-filter-options">
  {#each selectedOptionsForDisplay as option}
    <Chip text={option.name} style={option.type} optionId={option.id} removable={true} whenRemoved={optionRemoved}  />
  {/each}
</div>


<style>
  .selected-filter-options {
    display: flex;
    flex-wrap: wrap;
    padding-top: 16px;
  }
</style>