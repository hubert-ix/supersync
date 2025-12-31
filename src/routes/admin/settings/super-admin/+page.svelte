<script>
  import { fade } from 'svelte/transition';
  import { banner } from '$lib/stores/banner';
  import { superAdminSettings } from '$lib/stores/superAdminSettings';
  import { snackbarStore } from '$lib/stores/snackbarMessages';
  import Button from "$lib/UI/Button.svelte";
  import config from "$lib/functions/config.js";
  import FormItem from "$lib/forms/FormItem.svelte";
  import SingleCheckboxInput from '$lib/forms/SingleCheckboxInput.svelte';
  import FloatingButtons from '$lib/UI/FloatingButtons.svelte';
  import LoadingSpinner from '$lib/UI/LoadingSpinner.svelte';
  import * as api from '$lib/api';

  let { data } = $props();
  let submitting = $state(false);
  let settings = $state(config.superAdminSettings);
  for (let i in settings) {
    settings[i].value = data.superAdminSettings[settings[i].id];
  }

  $banner = {title: "Super admin", backLink: "/admin/settings"};

  async function save() {
    submitting = true;
    for (let i in settings) {
      let setting = settings.find(obj => obj.id == settings[i].id);
      let value = (setting.value)?"yes":"no";
      api.patch(fetch, "/api/settings/" + settings[i].id, {value});
      data.superAdminSettings[settings[i].id] = (setting.value == "yes");
    }
    snackbarStore.addMessage("The changes have been saved");
    submitting = false;
  }
</script>


<div in:fade>

  <FormItem label="Enabled functionalities">
    {#each settings as setting}
      <SingleCheckboxInput label={setting.label} bind:checked={setting.value} index={setting.id} />
    {/each}
  </FormItem>

  <FloatingButtons>
    <Button caption="Save" type="contained" disabled={submitting} on:click={save} />
    {#if submitting}
      <LoadingSpinner size="small" />
    {/if}
  </FloatingButtons>

</div>
