<script>
  import Autocomplete from "$lib/forms/Autocomplete.svelte";
  import * as api from '$lib/api';

  let { 
    selectedLibrary = $bindable(),
    placeholder = "Enter library name..."
  } = $props();

  let libraries = $state([]);
  let loading = $state(false);
  let value = $state("");

  async function loadLibraries(keyword) {
    loading = true;
    let params = {
      limit: 5,
      sort_by: "title",
      sort_order: "asc",
      search: keyword,
      status: "published"
    }
    let response = await api.get(fetch, "/api/librarys", params);
    libraries = response.libraries;
    loading = false;
  }
</script>


<Autocomplete 
  {placeholder}
  items={libraries} 
  bind:value={value} 
  bind:selectedItems={selectedLibrary} 
  {loading} 
  onInput={loadLibraries} 
/>