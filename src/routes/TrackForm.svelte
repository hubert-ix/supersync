<script>
  import { goto, beforeNavigate, invalidate } from '$app/navigation';
  import { onMount, tick } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import { createForm } from "svelte-forms-lib";
  import { snackbarStore } from '$lib/stores/snackbarMessages';
  import Button from "$lib/UI/Button.svelte";
  import FormItem from "$lib/forms/FormItem.svelte";
  import TextInput from "$lib/forms/TextInput.svelte";
  import RadioInput from "$lib/forms/RadioInput.svelte";
  import CheckboxInput from "$lib/forms/CheckboxInput.svelte";
  import SelectDropdown from "$lib/UI/SelectDropdown.svelte";
  import FloatingButtons from '$lib/UI/FloatingButtons.svelte';
  import LoadingSpinner from '$lib/UI/LoadingSpinner.svelte';
  import Modal from "$lib/UI/Modal.svelte";
  import config from "$lib/functions/config";
  import dayjs from 'dayjs';
  import * as api from '$lib/api';
 
  let { 
    track = null,
    libraries,
    albums,
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
  let buttonText = (mode == "add")?"Create track":"Save track details";
  let showAddAlbum = $state(false);
  let showAddLibrary = $state(false);
  let newAlbumTitle;
  let newLibraryTitle;
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

  // set up the form
  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues: {
      album_id: (mode == "edit")?track.album_id:0,
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

  if (mode == "edit") {
    $form.libraries = [];
    for (let lib of track.libraries) {
      $form.libraries.push(lib.id);
    }
  }

  onMount(async () => {
    document.getElementById("edit-title").focus();
  });

  function updateStatus() {
    $form.status = ($form.libraries.length)?"signed":"unsigned";
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

  // make sure the track is not related to any items (before deletion)
  async function checkDeletion() {
    let [response1, response2] = await Promise.all([
      api.get(fetch, "/api/courses", {limit: 1, track_id: track.id}),
      api.get(fetch, "/api/users", {limit: 1, track_id: track.id})
    ]);
    canDelete = (!response1.courses.length && !response2.users.length);
    showPopup = true;
  }

  // delete the track
  async function deleteTrack() {
    submitting = true;
    await api.del(fetch, "/api/tracks/" + track.id);
    changed = false;
    snackbarStore.addMessage("The track has been deleted");
    goto ("/")
  }
</script>


<div class="form width-xlarge" transition:slide>
  <form onsubmit={handleSubmit}>
    
    <FormItem label="Track title" id="edit-title" errorMessage={$errors.title}>
      <TextInput id="edit-title" on:change={handleChange} bind:value={$form.title} />
    </FormItem>

    <div class="grid">

      <FormItem label="Libraries" id="edit-libraries">
        <CheckboxInput name="edit-libraries" options={libraries} bind:value={$form.libraries} change={updateStatus} />
        <div class="add-link" onclick={openAddLibrary}>
          Add library
        </div>
      </FormItem>

      <FormItem label="Album" id="edit-album">
        <RadioInput name="edit-album" options={albums} bind:value={$form.album_id} style="columns" />
        <!--<SelectDropdown options={albums} bind:selectedOption={$form.album_id} style="form" />-->
        <div class="add-link" onclick={openAddAlbum}>
          Add album
        </div>
      </FormItem>

      <FormItem label="Status" id="edit-status">
        <RadioInput name="edit-status" bind:value={$form.status} options={statusSettings} />
      </FormItem>

    </div>

    <FloatingButtons width="xlarge">
      <Button caption={buttonText} type="contained" disabled={submitting} />
      <Button caption="Cancel" type="outlined" disabled={submitting} on:click={onCancel} />
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
  .grid {
    display: grid;
    grid-template-columns: 1fr 2fr 0.5fr;
    grid-gap: 1rem;
  }

  .add-link {
    margin-left: 2.2rem;
    border-bottom: dashed 1px #2f9688;
    display: inline-block;
    color: #2f9688;
    font-size: 0.9rem;
    cursor: pointer;
  }
</style>