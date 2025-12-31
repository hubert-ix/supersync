<script>
  import Autocomplete from "$lib/forms/Autocomplete.svelte";
  import * as api from '$lib/api';

  let { 
    selectedUser = $bindable(), 
    multiple = false, 
    type ,
    placeholder = "Enter user name..."
  } = $props();
  let users = $state([]);
  let loading = $state(false);
  let value = $state("");

  async function loadUsers(keyword) {
    loading = true;
    let params = {
      limit: 5,
      sort_by: "first_name",
      sort_order: "asc",
      search: keyword,
      type
    }
    let response = await api.get(fetch, "/api/users", params);
    users = response.users;
    for (let i in users) {
      users[i].title = users[i].display_name; // we use "title" in the autocomplete component
    }
    loading = false;
  }
</script>


<Autocomplete 
  {placeholder} 
  itemType="user"
  items={users} 
  {multiple}
  bind:value={value} 
  bind:selectedItems={selectedUser} 
  {loading} 
  onInput={loadUsers} 
/>