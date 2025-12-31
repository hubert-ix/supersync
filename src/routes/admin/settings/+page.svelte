<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { banner } from '$lib/stores/banner';
  import { createForm } from "svelte-forms-lib";
  import { snackbarStore } from '$lib/stores/snackbarMessages';
  import tz from '$lib/functions/timezones';
  import FormItem from "$lib/forms/FormItem.svelte";
  import TextInput from "$lib/forms/TextInput.svelte";
  import SelectDropdown from '$lib/UI/SelectDropdown.svelte';
  import FileInput from '$lib/forms/FileInput.svelte';
  import FloatingButtons from '$lib/UI/FloatingButtons.svelte';
  import LoadingSpinner from '$lib/UI/LoadingSpinner.svelte';
  import Button from "$lib/UI/Button.svelte";
  import * as api from '$lib/api';

  $banner = {title: "Global settings"};
  let settings = [];
  let loading = $state(true);
  let submitting = $state(false);
  let dateFormats = [
    {value: "DD/MM/YYYY", label: "DD/MM/YYYY"},
    {value: "YYYY-MM-DD", label: "YYYY-MM-DD"},
    {value: "YYYY-DD-MM", label: "YYYY-DD-MM"},
  ];
  let timezones = [];
  for (let i in tz.timezones) {
    timezones.push({
      value: tz.timezones[i], label: tz.timezones[i]
    });
  }

  // set up the form
  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues: {},
  });

  onMount(async () => {
    let response = await api.get(fetch, "/api/settings/", {type: "global"});
    settings = response.settings;
    for (let i in settings) {
      $form[settings[i].name] = settings[i].value;
    }
    loading = false;
  });

  async function save() {
    submitting = true;
    for (let i in settings) {
      let value = $form[settings[i].name];
      await api.patch(fetch, "/api/settings/" + settings[i].name, {value});
    }
    snackbarStore.addMessage("The changes have been saved");
    submitting = false;
  }
</script>


{#if !loading}
  <div class="form" in:fade>

    <FormItem label="Organisation name" description="Used in emails, browser tabs" id="organisation-name">
      <TextInput name="organisation-name" bind:value={$form.organisation_name} />
    </FormItem>

    <FormItem label="From email" id="from-email">
      <TextInput name="from-email" bind:value={$form.from_email} />
    </FormItem>

    <FormItem label="Timezone" id="timezone">
      <SelectDropdown style="form" options={timezones} bind:selectedValue={$form.timezone} />
    </FormItem>
    
    <FormItem label="Date format" id="date-format">
      <SelectDropdown style="form" options={dateFormats} bind:selectedValue={$form.date_format} />
    </FormItem>

    <!--
    <FormItem label="Logo for desktop viewports" id="logo-desktop" errorMessage={$errors.logo_desktop}>
      <FileInput type="image" thumbnailWidth="100" id="logo-desktop" folder="global" bind:url={$form.logo_desktop} onError={(message) => $errors.logo_desktop = message} />
    </FormItem>

    <FormItem label="Logo for mobile devices" id="logo-mobile" errorMessage={$errors.logo_mobile}>
      <FileInput type="image" thumbnailWidth="100" id="logo-mobile" folder="global" bind:url={$form.logo_mobile} onError={(message) => $errors.logo_mobile = message} />
    </FormItem>
    -->

    <FormItem label="Favicon" id="favicon" errorMessage={$errors.favicon}>
      <FileInput type="image" thumbnailWidth="30" id="favicon" folder="global" bind:url={$form.favicon} onError={(message) => $errors.favicon = message} />
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


<style>
  .form {
    max-width: 40rem;
  }
</style>