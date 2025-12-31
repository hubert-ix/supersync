<script>
  import { preventDefault } from 'svelte/legacy';

  import { PUBLIC_IMAGEKIT_ID, PUBLIC_IMAGEKIT_PUBLIC_KEY, PUBLIC_IMAGEKIT_PRIVATE_KEY } from '$env/static/public';
  import { fade } from 'svelte/transition';
  import { tick } from 'svelte';
  import ImageKit from 'imagekit';
  import config from "$lib/functions/config.js";
  import Button from "$lib/UI/Button.svelte";
  import Dropdown from "$lib/UI/Dropdown.svelte";
  import FormItem from "$lib/forms/FormItem.svelte";
  import TextInput from "$lib/forms/TextInput.svelte";
  import LoadingSpinner from "$lib/UI/LoadingSpinner.svelte";
  import Modal from "$lib/UI/Modal.svelte";

  let {
    videoURL = $bindable(),
    videoEmbed = $bindable(),
    folder = "videos",
    id,
    caption = "Add a video",
    showPreview = true,
    buttonType = "outlined",
    children
  } = $props();

  let videoType = $state(null);
  let showOptions = $state(false);
  let uploading = $state(false);
  let submitting = false;
  let showEmbeddedVideoForm = $state(false);
  let embedError = $state("");
  let videoErrorMessage = "";
  let videoOptions = [
    {value: "upload", label: "Upload a video from your device"},
    {value: "embed", label: "Paste a YouTube or Vimeo URL"}
  ];

  let imagekit = new ImageKit({
    publicKey: PUBLIC_IMAGEKIT_PUBLIC_KEY,
    privateKey: PUBLIC_IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: PUBLIC_IMAGEKIT_ID
  });

  $effect(() => {
    if (videoURL) {
      videoType = "upload";
      let temp = videoURL.split("||");
      videoURL = temp[0];
    }
    else if (videoEmbed) {
      videoType = "embed";
    }
    else {
      videoType = null;
    }
  });
  
  function openOptions(e) {
    e.stopPropagation();
    showOptions = true;
  }

  async function processOption(e) {
    let selected = e.detail.selected.value;
    if (selected == "upload") {
      await tick();
      let button = document.getElementById("file-upload-" + id);
      button.click();
    }
    else {
      showEmbeddedVideoForm = true;
      await tick();
      document.getElementById("embed-input").focus();
    }
  }

  function uploadVideo(e) {
    uploading = true;
    let video = e.target.files[0];
    if (!video) return;
    // upload the video on imagekit
    imagekit.upload({
      file : video,
      fileName : video.name,
      folder
    }, function(error, result) {
        if (error) {
          console.log("Video upload error", error);
          uploading = false;
        }
        else {
          console.log("uploaded video", result);
          videoURL = result.url + "||" + result.fileId;
          videoEmbed = "";
          videoType = "upload";
          uploading = false;
        }
    });
  }

  function addEmbeddedVideo(e) {
    e.preventDefault();
    embedError = "";
    if (!videoEmbed || videoEmbed == "") {
      embedError = "Please paste your embedded code here";
    }
    else if (videoEmbed.indexOf("yout") == -1 && videoEmbed.indexOf("vimeo") == -1) {
      embedError = "The video must be from YouTube or Vimeo";
    }
    else {
      videoType = "embed";
      videoURL = "";
      showEmbeddedVideoForm = false;
    }
  }

  async function removeVideo() {
    // delete the file on imageKit
    let fileId = videoURL.split("||")[1]
    console.log("Deleting file", fileId)
    // call the server
    if (typeof fileId !== "undefined") {
      await fetch("/api/imagekit/" + fileId, { method: 'DELETE' });
    }
    videoURL = null;
  }

  function removeEmbeddedVideo() {
    videoEmbed = "";
    videoType = null;
  }
</script>


<!-- option selection -->  
{#if !videoType || !showPreview}
  <Button {caption} type={buttonType} on:click={openOptions} noSubmit={true} disabled={uploading}>
    {@render children?.()}
  </Button>
  <Dropdown bind:selectedValue={videoType} bind:show={showOptions} options={videoOptions} on:change={processOption} />
{/if}

<!-- video upload input -->
{#if !videoURL}
  {#if !uploading}
    <input type="file" id="file-upload-{id}" class="hidden-file-input" name="image" accept="videos/*" onchange={uploadVideo} />
  {:else}
    <LoadingSpinner size="small" />
  {/if}
{/if}

<!-- video upload preview -->
{#if videoURL && showPreview}
  <div class="preview" in:fade>
    <button class="close" onclick={preventDefault(removeVideo)} disabled={submitting}><img src="/images/icon-close-white.png" width="12" alt="Remove" /></button>
    {videoURL}
  </div>
{/if}

<!-- video embed preview -->
{#if videoEmbed && showPreview}
  <div class="preview" in:fade>
    <button class="close" onclick={preventDefault(removeEmbeddedVideo)} disabled={submitting}><img src="/images/icon-close-white.png" width="12" alt="Remove" /></button>
    {videoEmbed}
  </div>
{/if}

<!-- video embed input -->
{#if showEmbeddedVideoForm}
  <Modal close={() => showEmbeddedVideoForm = false}>
    <FormItem id="embedded-video" errorMessage={embedError}>
      <TextInput placeholder="Paste YouTube or Vimeo URL here" id="embed-input" bind:value={videoEmbed} />
    </FormItem>
    <Button caption="Add video" on:click={addEmbeddedVideo} />
  </Modal>
{/if}

<div class="error">
  {videoErrorMessage}
</div>

  

<style>
  .preview {
    display: flex;
  }
  
  .preview button.close {
    margin-right: 6px;
    top: 4px;
    position: relative;
  }

  button.close {
    border: none;
    padding: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #616161;
    outline: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  button.close:disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }

  .hidden-file-input {
    display: none;
  }
</style>