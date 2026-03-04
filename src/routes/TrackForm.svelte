<script>
  import { goto } from '$app/navigation';
  import { onMount, tick } from 'svelte';
  import { slide } from 'svelte/transition';
  import { createForm } from "svelte-forms-lib";
  import { snackbarStore } from '$lib/stores/snackbarMessages';
  import Button from "$lib/UI/Button.svelte";
  import FormItem from "$lib/forms/FormItem.svelte";
  import TextInput from "$lib/forms/TextInput.svelte";
  import RadioInput from "$lib/forms/RadioInput.svelte";
  import CheckboxInput from "$lib/forms/CheckboxInput.svelte";
  import DateTimeInput from '$lib/forms/DateTimeInput.svelte';
  import SelectDropdown from "$lib/UI/SelectDropdown.svelte";
  import FloatingButtons from '$lib/UI/FloatingButtons.svelte';
  import LoadingSpinner from '$lib/UI/LoadingSpinner.svelte';
  import Modal from "$lib/UI/Modal.svelte";
  import dayjs from 'dayjs';
  import * as api from '$lib/api';
 
  let { 
    track = null,
    libraries,
    albums,
    tags,
    onCancel = () => {},
    onSubmit = () => {},
  } = $props();
  let mode = (track)?"edit":"add";
  let changed = $state(false);
  let submitting = $state(false);
  let processing = $state(false);
  let loading = $state(true);
  let showPopup = $state(false);
  let canDelete = $state(false);
  let libraryAlbums = $state([]);
  let buttonText = (mode == "add")?"Create track":"Save track details";
  let showAddLibrary = $state(false);
  let showAddAlbum = $state(false);
  let showAddTag = $state(false);
  let newAlbumTitle;
  let newLibraryTitle;
  let newTagTitle;
  let statusSettings = [
    {id: "signed", label: "Signed"},
    {id: "unsigned", label: "Not signed"},
  ];

  for (let i in albums) {
    albums[i].label = albums[i].title;
  }
  for (let i in libraries) {
    libraries[i].label = libraries[i].title;
  }
  for (let i in tags) {
    tags[i].label = tags[i].title;
  }

  // set up the form
  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues: {
      album_id: (mode == "edit")?track.album_id:0,
      created: (mode == "edit")?track.created:dayjs().format("MM/DD/YYYY"),
      libraries: (mode == "edit")?track.libraries:[],
      tags: (mode == "edit")?track.tags:[],
      title: (mode == "edit")?track.title:"",
      status: (mode == "edit")?track.status:"unsigned",
    },
    validate: values => {
      let errs = {};
      if (values.name === "") {
        errs["title"] = "Dude, we need a title";
      }
      return errs;
    },
    onSubmit: async values => {
      submitting = true;
      onSubmit(values);
    }
  });

  onMount(async () => {
    document.getElementById("edit-title").focus();
    librarySelected();
  });

  function librarySelected() {
    $form.status = ($form.libraries.length)?"signed":"unsigned";
    libraryAlbums = albums.filter(a => $form.libraries.includes(a.library_id));
  }

  async function openAddAlbum() {
    showAddAlbum = !showAddAlbum;
    await tick();
    document.getElementById("edit-album-title").focus();
  }

  async function openAddLibrary() {
    showAddLibrary = !showAddLibrary;
    await tick();
    document.getElementById("edit-library-title").focus();
  }

  async function openAddTag() {
    showAddTag = !showAddTag;
    await tick();
    document.getElementById("edit-tag-title").focus();
  }

  async function addAlbum() {
    processing = true;
    let response = await api.post(fetch, "/api/albums", {title: newAlbumTitle});
    albums.push({
      id: response.new_id,
      label: newAlbumTitle,
      title: newAlbumTitle,
    })
    albums.sort((a, b) => a.title.localeCompare(b.title));
    newAlbumTitle = "";
    showAddAlbum = false;
    processing = false;
    $form.album_id = response.new_id;
    document.getElementById("edit-title").focus();
  }

  async function addLibrary() {
    processing = true;
    let response = await api.post(fetch, "/api/libraries", {title: newLibraryTitle});
    libraries.push({
      id: response.new_id,
      label: newLibraryTitle,
      title: newLibraryTitle,
    })
    libraries.sort((a, b) => a.title.localeCompare(b.title));
    newLibraryTitle = "";
    showAddLibrary = false;
    processing = false;
  }

  async function addTag() {
    processing = true;
    let response = await api.post(fetch, "/api/tags", {title: newTagTitle});
    tags.push({
      id: response.new_id,
      label: newTagTitle,
      title: newTagTitle,
    })
    tags.sort((a, b) => a.title.localeCompare(b.title));
    newTagTitle = "";
    showAddTag = false;
    processing = false;
  }

  // delete a track
  async function deleteTrack(track) {
    submitting = true;
    await api.del(fetch, "/api/tracks/" + track.id);
    snackbarStore.addMessage("The track has been deleted");
    TextTrackList.filter(t => t.id != track.id);
  }
</script>


<div class="form width-xlarge {mode}" transition:slide>
  <form onsubmit={handleSubmit}>
    
    <div class="top">
      <div class="title">
        <FormItem label="Track title" id="edit-title" errorMessage={$errors.title}>
          <TextInput id="edit-title" on:change={handleChange} bind:value={$form.title} />
        </FormItem>
      </div>

      <FormItem label="Date created">
        <DateTimeInput includeTime={false} labelDate="" style="no-margin" bind:value={$form.created} />
      </FormItem>
    </div>

    <div class="grid">

      <FormItem label="Libraries" id="edit-libraries">
        <CheckboxInput name="edit-libraries" options={libraries} bind:value={$form.libraries} change={librarySelected} />
        <div class="add-link shifted" onclick={openAddLibrary}>
          Add library
        </div>
      </FormItem>

      {#if $form.libraries?.length}
        <FormItem label="Album" id="edit-album">
          <RadioInput name="edit-album" options={libraryAlbums} bind:value={$form.album_id} />
          <!--<SelectDropdown options={libraryAlbums} bind:selectedValue={$form.album_id} style="form" />-->
          <div class="add-link" onclick={openAddAlbum}>
            Add album
          </div>
        </FormItem>
      {/if}

      <FormItem label="Tags" id="edit-tags">
        <CheckboxInput name="edit-tags" options={tags} bind:value={$form.tags} />
        <div class="add-link shifted" onclick={openAddTag}>
          Add tag
        </div>
      </FormItem>

      <FormItem label="Status" id="edit-status">
        <RadioInput name="edit-status" bind:value={$form.status} options={statusSettings} />
      </FormItem>

    </div>

    <FloatingButtons width="xlarge">
      <Button caption={buttonText} type="contained" disabled={submitting} />
      <Button caption="Cancel" type="outlined" disabled={submitting} on:click={onCancel} noSubmit={true} />
      <!--
      {#if mode == "edit"}
        <Button caption="Delete track" type="outlined" disabled={submitting} noSubmit={true} on:click={checkDeletion} />
      {/if}
      -->
      {#if submitting}
        <LoadingSpinner size="small" />
      {/if}
    </FloatingButtons>

  </form>
</div>

{#if showAddAlbum}
  <Modal showCloseButton={false}>
    <FormItem>
      <TextInput id="edit-album-title" bind:value={newAlbumTitle} />
    </FormItem>
    <div class="actions">
      <Button type="contained" caption="Add album" on:click={addAlbum} disabled={processing} loading={processing} />
      <Button type="outlined" caption="Cancel" on:click={() => showAddAlbum = false} disabled={processing} noSubmit={true} />
    </div>
  </Modal>
{/if}

{#if showAddLibrary}
  <Modal showCloseButton={false}>
    <FormItem>
      <TextInput id="edit-library-title" bind:value={newLibraryTitle} />
    </FormItem>
    <div class="actions">
      <Button type="contained" caption="Add library" on:click={addLibrary} disabled={processing} loading={processing} />
      <Button type="outlined" caption="Cancel" on:click={() => showAddLibrary = false} disabled={processing} noSubmit={true} />
    </div>
  </Modal>
{/if}

{#if showAddTag}
  <Modal showCloseButton={false}>
    <FormItem>
      <TextInput id="edit-tag-title" bind:value={newTagTitle} />
    </FormItem>
    <div class="actions">
      <Button type="contained" caption="Add tag" on:click={addTag} disabled={processing} loading={processing} />
      <Button type="outlined" caption="Cancel" on:click={() => showAddTag = false} disabled={processing} noSubmit={true} />
    </div>
  </Modal>
{/if}

{#if showPopup}
  <Modal showCloseButton={false} close={() => showPopup = false}>
    <div style="text-align: left">
      {#if canDelete}
        <p>Are you sure you want to delete this track? This cannot be undone</p>
        <div class="actions">
          <Button type="contained" caption="Delete track" on:click={deleteTrack} disabled={submitting} loading={submitting} />
          <Button type="outlined" caption="Cancel" on:click={() => showPopup = false} disabled={submitting} noSubmit={true} />
        </div>
      {:else}
        <p>You cannot delete this track as it has related courses, team members or participants. Please remove all related items first to delete this track.</p>
        <Button type="outlined" caption="Close" on:click={() => showPopup = false} disabled={submitting} noSubmit={true} />
      {/if}
    </div>
  </Modal>
{/if}


<style>
  .form {
    cursor: default;
  }

  .form.edit {
    padding-top: 0.5rem;
    padding-bottom: 1rem;
    padding-left: 4rem;
  }

  .top {
    display: flex;
    justify-content: space-between;
    grid-gap: 1rem;
  }

  .top .title {
    flex: 1;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1.5fr 1fr 1fr;
    grid-gap: 1rem;
  }

  .add-link {
    border-bottom: dashed 1px #2f9688;
    display: inline-block;
    color: #2f9688;
    font-size: 0.9rem;
    cursor: pointer;
    margin-top: 0.5rem;
  }

  .add-link.shifted {
    margin-left: 2.2rem;
    margin-top: 0;
  }
</style>