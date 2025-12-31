<script>
  import { PUBLIC_IMAGEKIT_ID, PUBLIC_IMAGEKIT_PUBLIC_KEY, PUBLIC_IMAGEKIT_PRIVATE_KEY } from '$env/static/public';
  import { fade } from 'svelte/transition';
  import ImageKit from 'imagekit';
  import LoadingSpinner from '$lib/UI/LoadingSpinner.svelte';

  let {
    url = $bindable(null),
    id = "",
    folder = "documents",
    type = "document",
    label = (type == "image")?"Select image":"Select file",
    thumbnailWidth = 300,
    thumbnailType = "",
    showPreview = true,
    onError = () => {}
  } = $props();

  let uploading = $state(false);
  let thumbnailURL = $state();
  let removeText = (type == "image")?"Remove image":"Remove file";
  let inputAccept = (type == "image")?"images/*":"files/*";

  // initialise imageKit
  let imagekit = new ImageKit({
    publicKey: PUBLIC_IMAGEKIT_PUBLIC_KEY,
    privateKey: PUBLIC_IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: PUBLIC_IMAGEKIT_ID
  });

  if (url && type == "image") {
    generateThumbnail();
  }

  function generateThumbnail() {
    let fileURL = url.split("||")[0];
    if (type == "image") {
      if (thumbnailType == "face") {
        thumbnailURL = fileURL + "?tr=w-" + thumbnailWidth + ",h-" + thumbnailWidth + ",fo-face,r-max";
      }
      else if (thumbnailType == "banner") {
        thumbnailURL = fileURL + "?tr=w-" + thumbnailWidth + ",ar-4-1";
      }
      else {
        thumbnailURL = fileURL + "?tr=w-" + thumbnailWidth;
      }
    }
  }

  function uploadFile(e) {
    uploading = true;
    let file = e.target.files[0];
    if (!file) return;
    console.log(folder)
    // upload the file on imagekit
    imagekit.upload({
      file : file,
      fileName : file.name,
      folder
    }, function(error, result) {
        if (error) {
          console.log("ERROR", error);
          onError(error.message)
          uploading = false;
        }
        else {
          console.log("uploaded file", result);
          url = result.url + "||" + result.fileId;
          if (type == "image") {
            generateThumbnail();
          }
          uploading = false;
          if (!showPreview) {
            url = null;
          }
        }
    });
  }

  async function removeFile() {
    // delete the file on imageKit
    let fileId = url.split("||")[1]
    console.log("Deleting file", fileId)
    // call the server
    if (typeof fileId !== "undefined") {
      await fetch("/api/imagekit/" + fileId, { method: 'DELETE' });
    }
    url = null;
  }

  function getFilename(file) {
    let temp = file.split("/");
    let fileName = temp[temp.length - 1].split("||")[0];
    return fileName;
  }
</script>


{#if !url}
  <div class="input">
    {#if !uploading}
      <label for="file-upload-{id}">{label}</label>
      <input type="file" id="file-upload-{id}" name="file" accept={inputAccept} onchange={uploadFile} />
    {:else}
      <LoadingSpinner size="small" />
    {/if}
  </div>
{:else if showPreview}
  <div class="preview" in:fade>
    {#if type == "image"}
      <img src={thumbnailURL} alt="Preview" />
    {:else}
      {getFilename(url)}
    {/if}
    <div class="remove-link">
      <a onclick={removeFile}>{removeText}</a>
    </div>
  </div>
{/if}



<style>
  label {
    display: inline-block;
    max-width: 768px;
    min-height: 3.5rem;
    padding: 1rem;
    border: 2px solid var(--color-primary); 
    border-radius: .5rem;
    background-color: none;
    color: #555;
    font-family: neue-haas-unica, sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    transition: border 0.3s;
    cursor: pointer;
  }

  input {
    display: none;
  }

  .remove-link {
    margin-top: 0.25rem;
  }
</style>