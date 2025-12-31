<script>
  import { onMount } from 'svelte';
  import { flip } from 'svelte/animate';
  import { fade, slide } from 'svelte/transition';
  import config from "$lib/functions/config.js";
  import Toolbar from "$lib/toolbar/Toolbar.svelte";
  import ToolbarSearch from "$lib/toolbar/ToolbarSearch.svelte";
  import AutocompleteProject from '$lib/forms/AutocompleteProject.svelte';
  import AutocompleteCourse from '$lib/forms/AutocompleteCourse.svelte';
  import Button from "$lib/UI/Button.svelte";
  import SelectDropdown from "$lib/UI/SelectDropdown.svelte";
  import LoadingSpinner from "$lib/UI/LoadingSpinner.svelte";
  import User from "$lib/teasers/User.svelte";
  import UserSkeleton from "$lib/skeletons/UserSkeleton.svelte";
  import NoResults from '$lib/structure/NoResults.svelte';
  import * as api from '$lib/api';

  let {
    showFilters = true,
    limitResults = false,
    maxResults = 20,
  } = $props();
  
  let users = $state([]);
  let nextPage = false;
  let observer;
  let target;
  let loading = $state(true);
  let filtering = $state(false);
  let sorting = $state(false);
  let searching = $state(false);
  let sortOptions = [
    {value: "created|desc", label: "Sort by date added"},
    {value: "first_name|asc", label: "Sort by first name"},
    {value: "last_name|asc", label: "Sort by last name"},
  ];
  let params = {
    limit: maxResults,
    page: 1,
    sort_by: "created",
    sort_order: "desc",
    type: "participant"
  };

  // filters
  let showFilterDropdown = $state(false);
  let selectedProject = $state(null);
  let selectedCourse = $state(null);

  let showLoadingMask = ($derived(filtering || searching || sorting));

  onMount(async () => {
    // load users
    await loadUsers();
    loading = false;
    // for infinite scrolling
    if (!limitResults) {
      observer = new IntersectionObserver(loadMore, config.infinite_scroll_options);
      target = document.querySelector('.loading');
      observer.observe(target);
    }
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
      if (selectedProject) {
        params.project_id = selectedProject.id;
      }
      else {
        delete params.project_id;
      }
      if (selectedCourse) {
        params.course_id = selectedCourse.id;
      }
      else {
        delete params.course_id;
      }
      await loadUsers();
      filtering = false;
    }
  }

  // reset filters
  async function resetFilters() {
    selectedProject = null;
    selectedCourse = null;
    filterList();
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
</script>


<Toolbar>
  <div class="toolbar-item">
    <Button caption="Filter" type="text" icon="filter" on:click={() => showFilterDropdown = !showFilterDropdown} />
  </div>
  <div class="toolbar-item">
    <SelectDropdown options={sortOptions} icon="sort" change={sortList} />
  </div>
  <div class="toolbar-item search last">
    <ToolbarSearch search={searchList} />
  </div>
  {#snippet filterPanel()}
    {#if showFilterDropdown}
      <div class="filter-dropdown" transition:slide>
        <div class="filter-dropdown-column">
          <div class="filter-dropdown-header">
            Project number
          </div>
          <AutocompleteProject bind:selectedProject={selectedProject} />
        </div>
        <div class="filter-dropdown-column">
          <div class="filter-dropdown-header">
            Course reference
          </div>
          <AutocompleteCourse bind:selectedCourse={selectedCourse} />
        </div>
      </div>
      <div class="filter-buttons">
        <Button caption="Apply filters" type="contained" on:click={filterList} />
        <Button caption="Reset filters" type="outlined" on:click={resetFilters} />
      </div>
    {/if}
  {/snippet}
</Toolbar>

{#if (users.length)}

  <div class="people-list">
    {#each users as user (user.id)}
      <div animate:flip={{duration: 400}} class:masked={showLoadingMask}>
        <User {user} />
      </div>
    {/each}
    {#if showLoadingMask}
      <div class="loading-mask">
        <LoadingSpinner />
      </div>
    {/if}
  </div>

{:else}

  {#if !loading}
    <NoResults />
  {/if}

{/if}

<div class="loading">
  {#if loading}
    <div class="people-list" in:fade>
      <UserSkeleton />
      <UserSkeleton />
      <UserSkeleton />
      <UserSkeleton />
      <UserSkeleton />
      <UserSkeleton />
    </div>
  {/if}
</div>
  

<style>
  .people-list {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 0.5rem;
  }

  .filter-dropdown {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1rem;
    padding-top: 2rem;
    margin-bottom: 2rem;
  }

  .filter-dropdown-header {
    margin-bottom: 0.5rem;
    color: #272759;
    font-size: .875rem;
  }

  .filter-buttons {
    grid-column-gap: 0.5rem;
    grid-row-gap: 1rem;
    display: flex;
  }

  @media only screen and (max-width: 1440px) {
    .people-list {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  @media only screen and (max-width: 990px) {
    .people-list {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  @media only screen and (max-width: 767px) {
    .people-list {
      grid-template-columns: 1fr;
    }
  }
</style>