<script>
  import { fade } from 'svelte/transition';
  import { snackbarStore } from '$lib/stores/snackbarMessages';
  import { onMount } from 'svelte';
  import config from "$lib/functions/config.js";
  import FormItem from "$lib/forms/FormItem.svelte";
  import SingleCheckboxInput from '$lib/forms/SingleCheckboxInput.svelte';
  import FloatingButtons from '$lib/UI/FloatingButtons.svelte';
  import LoadingSpinner from '$lib/UI/LoadingSpinner.svelte';
  import Button from "$lib/UI/Button.svelte";
  import * as api from '$lib/api';

  let loading = $state(true);
  let submitting = $state(false);
  let sectionTypes = $state([]);

  onMount(async () => {
    let response = await api.get(fetch, "/api/section_types/builtin");
    sectionTypes = response.section_types;
    loading = false;
  });

  async function save() {
    submitting = true;
    for (let i in sectionTypes) {
      api.patch(fetch, "/api/section_types/builtin/" + sectionTypes[i].id, {enabled: sectionTypes[i].enabled});
    }
    snackbarStore.addMessage("The changes have been saved");
    submitting = false;
  }
</script>


{#if !loading}
  <div in:fade>

    <FormItem label="Enabled section types">
      {#each sectionTypes as type}
        <SingleCheckboxInput label={type.title} bind:checked={type.enabled} index={type.id} />
      {/each}
    </FormItem>

    <FloatingButtons>
      <Button caption="Save" type="contained" disabled={submitting} on:click={save} />
      {#if submitting}
        <LoadingSpinner size="small" />
      {/if}
    </FloatingButtons>

  </div>
{:else}
  <LoadingSpinner />
{/if}