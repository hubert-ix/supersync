<script>

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


  function selectOption() {
    change(selectedValue)
  }
</script>


{#if icon}
  <img src="/images/{icon}" width="24" alt="icon" />
{/if}

<select bind:value={selectedValue} onchange={selectOption}>
  {#each options as option}
    <option value={option.id}>{option.label}</option>
  {/each}
</select>


<style>
  select {
    background: none;
    border: none;
    outline: none;
    color: #000;
    font-size: 1rem;
    font-family: var(--font-body);
  }
</style>