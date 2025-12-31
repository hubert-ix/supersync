<script>
  import { fade } from 'svelte/transition';
  import { supabase } from '$lib/stores/supabase';
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
    style = "",
    onError = () => {}
  } = $props();

  let uploading = $state(false);
  let thumbnailURL = $state();
  let removeText = (type == "image")?"Remove image":"Remove file";
  let inputAccept = (type == "image")?"images/*":"files/*";

  if (url && type == "image") {
    generateThumbnail();
  }

  function generateThumbnail() {
    if (type == "image") {
      url = url.replaceAll("%20", " ");
      let temp = url.split("files/");
      let response = $supabase.storage.from('files').getPublicUrl(temp[1], {
        transform: {
          width: thumbnailWidth,
          height: thumbnailWidth,
        }
      });
      thumbnailURL = response.data.publicUrl;
    }
  }

  async function uploadFile(e) {
    uploading = true;
    let file = e.target.files[0];
    if (!file) return;
    let keeptrying = true;
    let counter = 0;
    let path = "";
    let fileName = file.name;
    const fileExt = fileName.split('.').pop();
    const fileBaseName = fileName.replace(`.${fileExt}`, '');
    while (keeptrying) {
      // upload the file on supabase storage
      let response = await $supabase.storage.from('files').upload('public/' + folder + "/" + fileName, file, {
        cacheControl: '3600',
        upsert: false
      });
      console.log("tried uploading file", response);
      if (response.error) {
        // if the file already exists we add a counter after the file name and try again
        if (response.error.error == "Duplicate") {
          counter++;
          fileName = `${fileBaseName}_${counter}.${fileExt}`;
          console.log("file already exists, try again with new filename", fileName)
        }
        else {
          console.log("ERROR", response.error);
          onError(response.error.message)
          uploading = false;
          keeptrying = false;
          return;
        }
      }
      else {
        keeptrying = false;
        path = response.data.path;
      }
    }
    // retrieve the file path
    console.log("success! Now getting public path", path)
    let responseUrl = $supabase.storage.from('files').getPublicUrl(path);
    url = responseUrl.data.publicUrl;
    url = url.replaceAll("%20", " ");
    console.log("final url", url)
    if (type == "image") {
      generateThumbnail();
    }
    uploading = false;
    if (!showPreview) {
      //url = null;
    }
  }

  async function removeFile() {
    // delete the file on supabase
    let fileName = getFilename(url);
    const { data, error } = await $supabase.storage.from('files').remove(['public/' + fileName]);
    console.log(data, error)
    url = null;
  }

  // returns the filename from a URL
  function getFilename(file, limitChars = false) {
    let temp = file.split("/");
    let fileName = temp[temp.length - 1].split("||")[0];
    if (limitChars && fileName.length > 50) {
      fileName = fileName.substring(0, 20) + '...' + fileName.substring(fileName.length-10, fileName.length)
    }
    return fileName;
  }
</script>


{#if !url}
  <div class="input {style}">
    {#if !uploading}
      <label for="file-upload-{id}">{label}</label>
      <input type="file" id="file-upload-{id}" name="file" accept={inputAccept} onchange={uploadFile} />
    {:else}
      <LoadingSpinner size="small" />
    {/if}
  </div>
{:else if showPreview}
  <div class="preview {style}" in:fade>
    {#if type == "image"}
      <img src={thumbnailURL} alt="Preview" />
    {:else}
      {getFilename(url, true)}
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

  .inline label {
    border: none;
    padding: 0;
    min-height: 0;
    text-decoration: underline;
    text-underline-position: under;
    color: #52527a;
    margin-bottom: 0.25rem;
  }

  input {
    display: none;
  }

  .remove-link {
    margin-top: 0.25rem;
  }

  .preview.inline {
    display: flex;
    align-items: center;
    grid-gap: 1rem;
  }
</style>