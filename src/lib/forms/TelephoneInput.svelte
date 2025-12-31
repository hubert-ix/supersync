<script>
  import TextInput from "$lib/forms/TextInput.svelte";
  import SelectDropdown from '$lib/UI/SelectDropdown.svelte';
  import countries from '$lib/functions/countries';
  import "/node_modules/flag-icons/css/flag-icons.min.css";

  let {
    id,
    label = $bindable(null),
    prefix = $bindable(null),
    number = $bindable(""),
  } = $props();

  let codeOptions = [];
  for (let i in countries.list) {
    codeOptions.push({
      value: countries.list[i].id,
      label: '<span class="fi fi-' + countries.list[i].id.toLowerCase() + '"></span>' + countries.list[i].id + " (+" + countries.list[i].code + ")",
    });
  }
  codeOptions.sort((a,b) =>  a.value.localeCompare(b.value));
  codeOptions = [{value: null, label: ""}, ...codeOptions]
</script>


<div class="wrap" class:nolabel={!label}>
  {#if label}
    <div class="label">
      {label}
    </div>
  {/if}
  <div class="prefix">
    <SelectDropdown options={codeOptions} bind:selectedValue={prefix} style="form" />
  </div>
  <div class="number">
    <TextInput id="edit-{id}" bind:value={number} />
  </div>
</div>


<style>
  .wrap {
    display: flex;
    grid-gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .wrap.nolabel {
    grid-template-columns: 0.8fr 1.45fr;
  }

  .label {
    border: solid 2px #d4d4de;
    color: #000;
    background-color: #e9e9ee;
    border-radius: .5rem;
    padding: .875rem 1rem;
    display: flex;
    align-items: center;
    min-width: 100px;
  }

  .prefix {
    min-width: 160px;
  }
</style>