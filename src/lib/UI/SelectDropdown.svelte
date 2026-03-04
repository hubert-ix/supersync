<script>

  let {
    options,
    icon = null,
    selectedValue = $bindable(null),
    style = "",
    change = () => {}
  } = $props();


  function selectOption() {
    change(selectedValue)
  }
</script>


{#if icon}
  <img src="/images/{icon}" width="24" alt="icon" />
{/if}

<select bind:value={selectedValue} onchange={selectOption} class={style}>
  {#each options as option}
    <option value={option.id} selected={selectedValue == option.id}>{option.label}</option>
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

  select.form {
    padding: 0.5rem;
    border: 2px solid #009688;
    border-radius: .5rem;
    background-color: #fff;
    color: #555;
    display: block;
  }
</style>