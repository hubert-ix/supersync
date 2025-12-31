<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { banner } from '$lib/stores/banner';
  import dayjs from "dayjs";
  import config from "$lib/functions/config.js";
  import LoadingSpinner from "$lib/UI/LoadingSpinner.svelte";
  import Button from "$lib/UI/Button.svelte";
  import SingleCheckboxInput from "$lib/forms/SingleCheckboxInput.svelte";
  import UserAvatar from "$lib/structure/UserAvatar.svelte";
  import SelectDropdown from "$lib/UI/SelectDropdown.svelte";
  import Toolbar from "$lib/toolbar/Toolbar.svelte";
  import ToolbarSearch from "$lib/toolbar/ToolbarSearch.svelte";
  import ToolbarFiltersRegular from "$lib/toolbar/ToolbarFiltersRegular.svelte";
  import AdminSkeleton from "$lib/skeletons/AdminSkeleton.svelte";
  import * as api from '$lib/api';

  $banner = {title: "Administration", backLink: ""};
  
  let users = $state([]);
  let memberships = [];
  let nextPage = false;
  let observer;
  let target;
  let loading = $state(true);
  let searching = $state(false);
  let filtering = $state(false);
  let sorting = $state(false);
  let showLoadingMask = ($derived(sorting || filtering || searching));
  let showFilterDropdown = $state(false);
  let checkboxSelected = $state(false);
  let sortOptions = [
    //{value: "access|desc", label: "Sort by last access"},
    {value: "created|desc", label: "Date joined"},
    {value: "first_name|asc", label: "First name"},
    {value: "last_name|asc", label: "Last name"},
  ];
  let actionOptions = [
    {value: "export_csv", label: "Download as CSV"},
  ];
  let filterOptions = $state([
    {
      type: "type", 
      label: "Type", 
      data: []
    },
  ]);
  for (let i in config.userTypes) {
    filterOptions[0].data.push({id: config.userTypes[i].id, name: config.userTypes[i].label})
  }
  let selectedFilterOptions = $state([]);
  for (let i in filterOptions) {
    selectedFilterOptions[filterOptions[i].type] = [];
  }
  let params = {
    limit: config.max_users,
    page: 1,
    sort_by: "created",
    sort_order: "desc"
  };

  onMount(async () => {
    // load users
    await loadUsers();
    // for infinite scrolling
    observer = new IntersectionObserver(loadMore, config.infinite_scroll_options);
    target = document.querySelector('.loading');
    observer.observe(target);
    loading = false;
  });

  // load users based on the selected params
  async function loadUsers(append = false) {
    let response = await api.get(fetch, "/api/users", params);
    let items = response.users;
    users = (!append) ? items:[...users, ...items];
    nextPage = response.pagination.next_page;
  }
  
  // Load more results
  const loadMore = entries => {
    entries.forEach(async entry => {
      if (!nextPage || loading) return;
      if (entry.isIntersecting) {
        loading = true;
        params.page = nextPage;
        await loadUsers(true);
        loading = false;
      }
    });
  };
  
  // search results
  async function searchList(keyword) {
    if (!searching) {
      searching = true;
      params.page = 1;
      params.search = keyword;
      await loadUsers();
      searching = false;
    }
  }
  
  // filter results
  async function filterList() {
    if (!filtering) {
      filtering = true;
      params.page = 1;
      params.role = selectedFilterOptions["role"];
      params.type = selectedFilterOptions["type"];
      await loadUsers();
      filtering = false;
    }
  }
  
  // sort results
  async function sortList(sortCriteria) {
    if (!sorting) {
      sorting = true;
      params.page = 1;
      params.sort_by = sortCriteria.split("|")[0];
      params.sort_order = sortCriteria.split("|")[1];
      await loadUsers();
      sorting = false;
    }
  }
  
  // performs an action (triggered from the "actions" dropdown)
  async function performAction(e) {
    let action = e.detail.value;
    let idQueryString = "ids=";
    // go through selected checkboxes and gather the user uids
    let count = 0;
    for (let i in users) {
      let user = users[i];
      if (user.isSelected) {
        count++;
        idQueryString += user.id + ",";
      }
    }
    // perform the action
    let url;
    switch(action) {
      case "export_csv":
        url = config.drupal_base_url + "maze-api/export-users?" + idQueryString.slice(0, -1);
        goto(url);
        break;
    }
  }
  
  // this checks whether a checkbox is ticked or not
  function toggleCheckbox(id, checked) {
    let index = users.findIndex(obj => obj.id == id);
    users[index].isSelected = checked;
    // check that we have at least one checkbox selected
    if (checked) {
      checkboxSelected = true;
    }
    else {
      let atLeastOneCheckboxSelected = false;
      for (let i in users) {
        if (users[i].isSelected) {
          atLeastOneCheckboxSelected = true;
          break;
        }
      }
      checkboxSelected = atLeastOneCheckboxSelected;
    }
  }
  
  function toggleAllCheckboxes(value, checked) {
    for (let i in users) {
      users[i].isSelected = checked;
    }
    checkboxSelected = checked;
  }
  
  function displayAccess(user) {
    if (dayjs(user.access).format("YYYY") < 1980) {
      return "Never";
    }
    return dayjs(user.access).format("DD/MM/YYYY")
  }
</script>


<Toolbar>
  <div class="toolbar-item">
    <Button caption="Add" type="text" icon="add" href="/manage/user/create" />
  </div>
  <div class="toolbar-item">
    <Button caption="Filter" type="text" icon="filter" on:click={() => showFilterDropdown = !showFilterDropdown} />
  </div>
  <div class="toolbar-item">
    <SelectDropdown options={sortOptions} icon="sort" style="flat" change={sortList} />
  </div>
  {#if checkboxSelected}
    <div class="toolbar-item">
      <SelectDropdown options={actionOptions} icon="action" style="flat" label="Action" noActiveState={true} on:change={performAction} />
    </div>
  {/if}
  <div class="toolbar-item last">
    <ToolbarSearch search={searchList} />
  </div>
  {#snippet filterPanel()}
    {#if showFilterDropdown}
      <ToolbarFiltersRegular options={filterOptions} bind:selectedOptions={selectedFilterOptions} filter={filterList} />
    {/if}
  {/snippet}
</Toolbar>

<div class="table-wrap" in:fade>

  <table class:masked={showLoadingMask}>
    <thead>
      <tr>
        <th>User</th>
        <th></th>
        <th>Type</th>
        <th>OEL ID</th>
        <th>Date joined</th>
      </tr>
    </thead>
    <tbody>
      {#each users as user}
        <tr>
          <td>
            <a class="user" href="{user.path}">
              <UserAvatar {user} size="tiny" /> 
              <div class="user-info">
                <div class="user-name">{user.display_name}</div>
                <div class="user-email">{user.user_id}</div>
              </div>
            </a>
          </td>
          <td class="edit-link">
            <a href="/manage/user/{user.id}" class="edit"><img src="/images/pencil-outline.svg" width="24" alt="Edit" />Edit</a>
          </td>
          <td>
            {config.userTypes.find(obj => obj.id == user.type)?.label}
          </td>
          <td>
            {user.hr_id}
          </td>
          <td>
            {dayjs(user.created).format("DD/MM/YYYY")}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  {#if showLoadingMask}
    <div class="loading-mask">
      <LoadingSpinner />
    </div>
  {/if}

</div>

<div class="loading">
  {#if loading}
    <AdminSkeleton withCircle={true} />
    <AdminSkeleton withCircle={true} />
    <AdminSkeleton withCircle={true} />
    <AdminSkeleton withCircle={true} />
  {/if}
</div>


<style>
  a.user {
    display: flex;
    align-items: center;
  }
  
  .user-info {
    margin-left: 16px;
  }

  .user-email {
    color: var(--color-text);
  }

  a.edit img {
    margin-right: 0.5rem;
  }
</style>