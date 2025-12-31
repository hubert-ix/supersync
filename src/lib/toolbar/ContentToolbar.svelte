<script>
  import Toolbar from "$lib/toolbar/Toolbar.svelte";
  import ToolbarFiltersAdvanced from "$lib/toolbar/ToolbarFiltersAdvanced.svelte";
  import ToolbarFiltersRegular from "$lib/toolbar/ToolbarFiltersRegular.svelte";
  import ToolbarSearch from "$lib/toolbar/ToolbarSearch.svelte";
  import SelectDropdown from "$lib/UI/SelectDropdown.svelte";
  import Button from "$lib/UI/Button.svelte";
    
  let {
    categories = [],
    disableSort = false,
    filtersStyle = "regular",
    filterOptions = $bindable([]),
    filter,
    sort,
    search,
    children,
    sortOptions = [
      {value: "created|desc", label: "Sort by date"},
      {value: "created|asc", label: "Sort by date (asc)"},
      {value: "count_comments|desc", label: "Sort by comments"},
      {value: "count_views|desc", label: "Sort by views"},
      {value: "count_likes|desc", label: "Sort by likes"}
    ],
  } = $props();

  let showFilterDropdown = $state(false);
  let selectedFilterOptions = $state([]);

  // for nested filters
  let filterDropdownOptions = [];
  for (let i in filterOptions) {
    filterDropdownOptions.push({label: filterOptions[i].label, value: filterOptions[i].type});
  }

  function showNestedFilterDropdown(optionType) {
    let index = filterOptions.findIndex(obj => obj.type == optionType);
    // hide all categories
    hideAllFilterCategories();
    // show selected category
    filterOptions[index].isShown = true;
  }
  
  function hideAllFilterCategories() {
    for (let i in filterOptions) {
      filterOptions[i].isShown = false;
    }
  }
</script>


<Toolbar>
  {@render children?.()}
  {#if filterOptions.length}
    <div class="toolbar-item">
      {#if filtersStyle == "regular"}
        <Button caption="Filter" type="text" icon="filter" on:click={() => showFilterDropdown = !showFilterDropdown} />
      {:else}
        <SelectDropdown label="Filter" options={filterDropdownOptions} icon="filter" noActiveState={true} change={showNestedFilterDropdown} />
      {/if}
    </div>
  {/if}
  {#if !disableSort}
    <div class="toolbar-item">
      <SelectDropdown options={sortOptions} icon="sort" change={sort} />
    </div>
  {/if}
  <div class="toolbar-item search last">
    <ToolbarSearch {search} />
  </div>
  {#if filterOptions.length}
    {#snippet filterPanel()}
      <ToolbarFiltersAdvanced {filterOptions} {filter} />
      {#if showFilterDropdown}
      ok?
        <ToolbarFiltersRegular options={filterOptions} bind:selectedOptions={selectedFilterOptions} {filter} />
      {/if}
    {/snippet}
  {/if}
</Toolbar>