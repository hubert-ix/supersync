<script>
  import LoadingSpinner from "$lib/UI/LoadingSpinner.svelte";
  import UserAvatar from "$lib/structure/UserAvatar.svelte";
  import Chip from "$lib/UI/Chip.svelte";
  
  let {
    placeholder = $bindable(""),
    value = $bindable(),
    disabled = $bindable(false),
    items,
    itemType = "",
    loading = $bindable(false),
    selectedItems = $bindable([]),
    multiple = false,
    description = null,
    onInput = () => {}
  } = $props();
  let originalPlaceholder = placeholder;
  let showResults = $state(false);

  $effect(() => {
    showResults = (items.length);
  });

  $effect(() => {
    if (!multiple && selectedItems !== null) {
      placeholder = "";
      disabled = true;
    }
    else {
      placeholder = originalPlaceholder;
      disabled = false;
    }
  });
  
  function selectItem(item) {
    if (multiple) {
      selectedItems = [...selectedItems, item];
    }
    else {
      selectedItems = item;
    }
    value = "";
    showResults = false;
    document.getElementById("autocomplete-input").focus();
  }

  function removeItem(id) {
    if (multiple) {
      selectedItems = selectedItems.filter(item => item.id != id);
    }
    else {
      selectedItems = null;
    }
  }
  
  function onKeyDown(e) {
    if (e.keyCode === 27) {
      // Escape
      hideResults()
    }
  }
  
  function loadResults() {
    let keyword = "";
    if (value.length > 1) {
      if (multiple) {
        let temp = value.split(",");
        keyword = temp.pop().trim();
      }
      else {
        keyword = value.trim();
      }
      if (keyword.length > 2 && keyword != "" && keyword != ",") {
        loading = true;
        onInput(keyword);
      }
    }
  }
  
  function hideResults() {
    showResults = false;
  }
</script>


<div class="autocomplete">

  <div class="users-input-wrapper">
    {#if multiple}
      {#each selectedItems as item}
        <Chip 
          text={(itemType == "user")?item.display_name:item.title} 
          optionId={item.id} 
          style="autocomplete"
          removable={true} 
          whenRemoved={removeItem} 
          user={item} 
        />
      {/each}
    {:else}
      {#if selectedItems !== null}
        <Chip 
          text={(itemType == "user")?selectedItems.display_name:selectedItems.title} 
          optionId={selectedItems.id} 
          style="autocomplete"
          removable={true} 
          whenRemoved={removeItem} 
          user={selectedItems} 
        />
      {/if}
    {/if}
    <input 
      type="text" 
      id="autocomplete-input" 
      {disabled} 
      {placeholder} 
      bind:value 
      onkeydown={onKeyDown} 
      oninput={loadResults} 
      autocomplete="off" 
    />
  </div>

  {#if description}
    <div class="description">
      {@html description}
    </div>
  {/if}

  {#if showResults}
    <div class="results">
      {#each items as item (item.id)}
        <div class="item" onclick={() => selectItem(item)}>
          {#if itemType == "user"}
            <div class="avatar"><UserAvatar user={item} size="tiny" /></div>
          {/if}
          {item.title}
        </div>
      {/each}
    </div>
  {/if}
  
  {#if loading}
    <div class="loading">
      <LoadingSpinner size="small" />
    </div>
  {/if}

</div>

<svelte:body onclick={hideResults} />


<style>
  .autocomplete {
    position: relative;
  }
  
  .results {
    position: absolute;
    background: #fff;
    z-index: 200;
    width: 100%;
    border: solid 2px #d4d4de;
    border-radius: 0.5rem;
    padding: 8px 0;
    box-shadow: 0 4px 4px #01002414;
    overflow-y: auto;
  }
  
  .results .item {
    display: flex;
    align-items: center;
    padding: 8px 24px 8px 16px;
    cursor: pointer;
    font-family: Roboto, sans-serif;
    font-size: 15px;
    font-weight: 400;
    transition: border-color 400ms ease, background-color 400ms ease;
  }
  
  .results .item:hover {
    background-color: #52527a29;
  }
  
  .avatar {
    margin-right: 16px;
  }
  
  .loading {
    position: absolute;
    top: 15px; 
    right: 15px;
  }

  .users-input-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    min-height: 3.9rem;
    padding: .7rem 1rem;
    border: solid 2px var(--color-borders);
    border-radius: 0.5rem;
    background-color: #fff;
    transition: border 0.3s;
  }
  
  input {
    flex: 1;
    border: none;
    background: none;
    padding: 0;
    margin: 0;
    outline: none;
    color: #616161;
    font-family: neue-haas-unica, sans-serif;
    font-size: 15px;
    line-height: 26px;
    letter-spacing: 0.5px;
  }

  .description {
    font-size: 0.8rem;
    margin-top: 0.25rem;
    margin-left: 0.5rem;
  }
</style>