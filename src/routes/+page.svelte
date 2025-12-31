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
  import Banner from '$lib/structure/Banner.svelte';
  import RadioInput from '$lib/forms/RadioInput.svelte';
  import DateTimeInput from '$lib/forms/DateTimeInput.svelte';
  import AutocompleteLibrary from '$lib/forms/AutocompleteLibrary.svelte';
  import AutocompleteUser from '$lib/forms/AutocompleteUser.svelte';
  import NoResults from '$lib/structure/NoResults.svelte';
  import TrackForm from './TrackForm.svelte';
  import dayjs from 'dayjs';
  import * as api from '$lib/api';

  let { data } = $props();
  let libraries = $state(data.libraries);
  let albums = $state(data.albums);
  let tracks = $state([]);
  let totalCount = $state();
  let showAddtrack = $state(false);
  let nextPage = false;
  let observer;
  let target;
  let loading = $state(true);
  let searching = $state(false);
  let filtering = $state(false);
  let sorting = $state(false);
  let currentSort = $state({
    id: "title",
    order: "asc"
  });
  let sortOptions = [
    {id: "title|asc", label: "Title"},
    {id: "created|desc", label: "Date added (desc)"},  
    {id: "created|asc", label: "Date added (asc)"},  
    //{id: "library(title)|asc", label: "Library"},
    {id: "album(title),title|asc", label: "Album"},
  ];
  let params = {
    limit: 100,
    page: 1,
    sort_by: "title",
    sort_order: "asc",
    sort_foreign: null
  };

  // filters
  let showFilterDropdown = $state(false);
  let selectedLibraryId = $state(0);
  let selectedAlbumId = $state(0);
  let showLoadingMask = ($derived(sorting || filtering || searching));

  let libraryOptions = [{
    id: 0,
    label: "All libraries"
  }];
  for (let i in libraries) {
    libraryOptions.push({
      id: libraries[i].id,
      label: libraries[i].title
    });
  }

  let albumOptions = [{
    id: 0,
    label: "All albums"
  }];
  for (let i in albums) {
    albumOptions.push({
      id: albums[i].id,
      label: albums[i].title
    });
  }

  onMount(async () => {
    // load tracks
    await loadTracks();
    loading = false;
    // for infinite scrolling
    observer = new IntersectionObserver(loadMore, config.infinite_scroll_options);
    target = document.querySelector('.loading');
    observer.observe(target);
  });

  // load tracks based on the selected params
  async function loadTracks(append = false) {
    console.log("params", params)
    let response = await api.get(fetch, "/api/tracks", params);
    totalCount = response.count;
    let items = response.tracks;
    tracks = (!append) ? items:[...tracks, ...items];
    nextPage = response.pagination.next_page;
  }
  
  // load more results
  const loadMore = entries => {
    entries.forEach(async entry => {
      if (!nextPage || loading) return;
      if (entry.isIntersecting) {
        loading = true;
        params.page = nextPage;
        await loadTracks(true);
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
      await loadTracks();
      searching = false;
    }
  }
  
  // filter results
  async function filterList() {
    if (!filtering) {
      filtering = true;
      params.page = 1;
      if (selectedLibraryId) {
        params.library_id = selectedLibraryId;
      }
      else {
        delete params.library_id;
      }
      if (selectedAlbumId) {
        params.album_id = selectedAlbumId;
      }
      else {
        delete params.album_id;
      }
      await loadTracks();
      filtering = false;
    }
  }

  // reset filters
  async function resetFilters() {
    selectedLibrary = null;
    search = "";
    filterList();
  }
  
  // sort results
  async function sortList(sortCriteria) {
    if (!sorting) {
      sorting = true;
      params.page = 1;
      let temp = sortCriteria.split("|");
      params.sort_by = temp[0];
      params.sort_foreign = (temp.length > 2)?temp[2]:null;
      if (currentSort.id == temp[0]) {
        params.sort_order = (currentSort.order == "asc")?"desc":"asc";
      }
      else {
        params.sort_order = "asc";
      }
      currentSort = {
        id: params.sort_by,
        order: params.sort_order
      }
      await loadTracks();
      sorting = false;
    }
  }

  async function addTrack(values) {
    console.log(values)
    await api.post(fetch, "/api/tracks", values);
    await loadTracks();
    showAddtrack = false;
  }

  async function updateTrack(track, values) {
    console.log(values)
    await api.patch(fetch, "/api/tracks/" + track.id, values);
    await loadTracks();
    track.show_form = false;
  }

  function openTrack(track) {
    track.show_form = !track.show_form;
  }
</script>


<div class="container width-huge">

  <div class="sheet width-xxxlarge">

    <Toolbar>
      <div class="toolbar-item">
        <Button caption="" type="text" icon="plus.svg" on:click={() => showAddtrack = !showAddtrack} />
      </div>
      <!--
      <div class="toolbar-item">
        <Button caption="Filter" type="text" icon="filter-outline.svg" on:click={() => showFilterDropdown = !showFilterDropdown} />
      </div>
      -->
      <div class="toolbar-item">
        <SelectDropdown options={libraryOptions} bind:selectedValue={selectedLibraryId} icon="filter.svg" change={filterList} />
      </div>
      <div class="toolbar-item">
        <SelectDropdown options={albumOptions} bind:selectedValue={selectedAlbumId} icon="filter.svg" change={filterList} />
      </div>
      <!--
      <div class="toolbar-item">
        <SelectDropdown options={sortOptions} icon="sort.svg" change={sortList} />
      </div>
      -->
      <div class="toolbar-item search last">
        <ToolbarSearch search={searchList} />
      </div>
      {#snippet filterPanel()}
        <!--
        {#if showFilterDropdown}
          <div class="filter-dropdown" transition:slide>
            <div class="filter-dropdown-column">
              <div class="filter-dropdown-header">
                Client
              </div>
              <AutocompleteLibrary bind:selectedLibrary={selectedLibrary} />
            </div>
          </div>
          <div class="filter-buttons">
            <Button caption="Apply filters" type="contained" on:click={filterList} />
            <Button caption="Reset filters" type="outlined" on:click={resetFilters} />
          </div>
        {/if}
        -->
      {/snippet}
    </Toolbar>

    {#if showAddtrack}
      <div class="add-track">
        <TrackForm 
          {libraries}
          {albums}
          onCancel={() => showAddtrack = false} 
          onSubmit={addTrack}
        />
      </div>
    {/if}

    {#if (tracks.length)}
      <div class="table-wrap">
        <table class:masked={showLoadingMask}>
          <thead>
            <tr>
              <th>
                <div class="sort-link" onclick={() => sortList("title")}>
                  Title ({totalCount})
                  {#if currentSort.id == "title"}
                    <div class="sort-direction" class:up={currentSort.order == "asc"}>
                      <img src="/images/down.png" alt="arrow" width="16" />
                    </div>
                  {/if}
                </div>
              </th>
              <th>
                Library
              </th>
              <th>
                <div class="sort-link" onclick={() => sortList("album(title),title")}>
                  Album
                  {#if currentSort.id == "album(title),title"}
                    <div class="sort-direction" class:up={currentSort.order == "asc"}>
                      <img src="/images/down.png" alt="arrow" width="16" />
                    </div>
                  {/if}
                </div>
              </th>
              <th>
                <div class="sort-link" onclick={() => sortList("created")}>
                  Date created
                  {#if currentSort.id == "created"}
                    <div class="sort-direction" class:up={currentSort.order == "asc"}>
                      <img src="/images/down.png" alt="arrow" width="16" />
                    </div>
                  {/if}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {#each tracks as track}
              <tr onclick={() => openTrack(track)}>
                <td>{track.title}</td>
                <td>
                  {#each track.libraries as library}
                    {library.title}
                  {/each}
                </td>
                <td>
                  {track.album?.title}
                </td>
                <td>{dayjs(track.created).format("DD/MM/YYYY")}</td>
              </tr>
              {#if track.show_form}
                <tr>
                  <td colspan="4" class="bare">
                    <TrackForm 
                      {libraries} 
                      {albums} 
                      {track} 
                      onCancel={() => track.show_form = false}
                      onSubmit={(values) => updateTrack(track, values)}
                    />
                  </td>
                </tr>
              {/if}
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

  </div>

</div>


<style>
  .add-track {
    border: solid 2px #0096887a;
    padding: 2rem;
    border-radius: 0.5rem;
    margin-bottom: 2rem;
  }

  .sort-link {
    cursor: pointer;
    display: flex;
    grid-gap: 0.5rem;
  }

  .sort-direction {
    transition: transform 0.2s;
    display: flex;
    align-items: center;
  }

  .sort-direction.up {
    transform: rotate(180deg);
  }
</style>
