<script>
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import config from "$lib/functions/config.js";
  import Toolbar from "$lib/toolbar/Toolbar.svelte";
  import ToolbarSearch from "$lib/toolbar/ToolbarSearch.svelte";
  import ToolbarFiltersRegular from "$lib/toolbar/ToolbarFiltersRegular.svelte";
  import SelectDropdown from "$lib/UI/SelectDropdown.svelte";
  import Button from "$lib/UI/Button.svelte";
  import LoadingSpinner from "$lib/UI/LoadingSpinner.svelte";
  import AdminSkeleton from '$lib/skeletons/AdminSkeleton.svelte';
  import RadioInput from '$lib/forms/RadioInput.svelte';
  import DateTimeInput from '$lib/forms/DateTimeInput.svelte';
  import AutocompleteClient from '$lib/forms/AutocompleteClient.svelte';
  import AutocompleteUser from '$lib/forms/AutocompleteUser.svelte';
  import NoResults from '$lib/structure/NoResults.svelte';
  import dayjs from 'dayjs';
  import * as api from '$lib/api';

  let { user } = $props();
  let projects = $state([]);
  let nextPage = false;
  let observer;
  let target;
  let loading = $state(true);
  let searching = $state(false);
  let filtering = $state(false);
  let sorting = $state(false);
  let sortOptions = [
    {value: "start_date|asc", label: "Sort by start date (asc)"},  
    {value: "start_date|desc", label: "Sort by start date (desc)"},  
    {value: "title|asc", label: "Sort by project number"},
    {value: "client(title)|asc", label: "Sort by client name"},
  ];
  let params = {
    limit: config.max_nodes,
    page: 1,
    sort_by: "start_date",
    sort_order: "asc",
    status: "published"
  };

  // filters
  let showFilterDropdown = $state(false);
  let selectedClient = $state(null);
  let selectedParticipant = $state(null);
  let selectedStatus = $state("all");
  let selectedStartDate = $state(null);
  let selectedEndDate = $state(null);
  let statusOptions = [
    {id: "all", name: "All project"},
    {id: "upcoming", name: "Upcoming only"},
  ];

  // if the user is a team member, we only display the projects he is assigned to
  if (user.type == "team-member") {
    params.profile_id = user.id; // TODO: this will conflict with the participant filter
  }

  let showLoadingMask = ($derived(sorting || filtering || searching));

  onMount(async () => {
    // load projects
    await loadProjects();
    loading = false;
    // for infinite scrolling
    observer = new IntersectionObserver(loadMore, config.infinite_scroll_options);
    target = document.querySelector('.loading');
    observer.observe(target);
  });

  // load projects based on the selected params
  async function loadProjects(append = false) {
    let response = await api.get(fetch, "/api/projects", params);
    let items = response.projects;
    projects = (!append) ? items:[...projects, ...items];
    nextPage = response.pagination.next_page;
  }
  
  // load more results
  const loadMore = entries => {
    entries.forEach(async entry => {
      if (!nextPage || loading) return;
      if (entry.isIntersecting) {
        loading = true;
        params.page = nextPage;
        await loadProjects(true);
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
      await loadProjects();
      searching = false;
    }
  }
  
  // filter results
  async function filterList() {
    if (!filtering) {
      filtering = true;
      params.page = 1;
      if (selectedStatus == "upcoming") {
        params.start_date = dayjs();
      }
      else {
        delete params.start_date;
      }
      if (selectedClient) {
        params.client_id = selectedClient.id;
      }
      else {
        delete params.client_id;
      }
      if (selectedParticipant) {
        params.profile_id = selectedParticipant.id;
      }
      else {
        delete params.profile_id;
      }
      if (selectedStartDate) {
        params.start_date = selectedStartDate;
      }
      else if (selectedStatus != "upcoming") {
        delete params.start_date;
      }
      if (selectedEndDate) {
        params.end_date = selectedEndDate;
      }
      else {
        delete params.end_date;
      }
      await loadProjects();
      filtering = false;
    }
  }

  // reset filters
  async function resetFilters() {
    selectedClient = null;
    selectedParticipant = null;
    selectedStatus = "all";
    selectedEndDate = null;
    selectedStartDate = null;
    filterList();
  }
  
  // sort results
  async function sortList(sortCriteria) {
    if (!sorting) {
      sorting = true;
      params.page = 1;
      params.sort_by = sortCriteria.split("|")[0];
      params.sort_order = sortCriteria.split("|")[1];
      await loadProjects();
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
            Client
          </div>
          <AutocompleteClient bind:selectedClient={selectedClient} />
        </div>
        <div class="filter-dropdown-column">
          <div class="filter-dropdown-header">
            Participant
          </div>
          <AutocompleteUser type="participant" bind:selectedUser={selectedParticipant} />
        </div>
        <div class="filter-dropdown-column">
          <div class="filter-dropdown-header">
            Date range
          </div>
          <div class="filter-dates">
            <DateTimeInput bind:value={selectedStartDate} labelDate="" includeTime={false} style="no-margin" />
            <DateTimeInput bind:value={selectedEndDate} labelDate="" includeTime={false} style="no-margin" />
          </div>
        </div>
        <div class="filter-dropdown-column">
          <div class="filter-dropdown-header">
            Project status
          </div>
          <RadioInput options={statusOptions} bind:value={selectedStatus} inline={true} />
        </div>
      </div>
      <div class="filter-buttons">
        <Button caption="Apply filters" type="contained" on:click={filterList} />
        <Button caption="Reset filters" type="outlined" on:click={resetFilters} />
      </div>
    {/if}
  {/snippet}
</Toolbar>

{#if (projects.length)}
  <div class="table-wrap">
    <table class:masked={showLoadingMask}>
      <thead>
        <tr>
          <th>Project number</th>
          <th>Client</th>
          <th>Start date</th>
          <th>End date</th>
        </tr>
      </thead>
      <tbody>
        {#each projects as project}
          <tr>
            <td><a href={project.path}>{project.title}</a></td>
            <td>{project.client?.title}</td>
            <td>{dayjs(project.start_date).format("DD/MM/YYYY")}</td>
            <td>{dayjs(project.end_date).format("DD/MM/YYYY")}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  {:else}
  {#if !loading}
    <NoResults />
  {/if}
{/if}

{#if showLoadingMask}
  <div class="loading-mask">
    <LoadingSpinner />
  </div>
{/if}

<div class="loading">
  {#if loading}
    <div in:fade>
      <AdminSkeleton />
      <AdminSkeleton />
      <AdminSkeleton />
      <AdminSkeleton />
      <AdminSkeleton />
      <AdminSkeleton />
    </div>
  {/if}
</div>

 
<style>
  a {
    color: var(--color-primary);
    text-underline-position: under;
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

  .filter-dates {
    display: flex;
    grid-gap: 0.5rem;
  }
</style>
