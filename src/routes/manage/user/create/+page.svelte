<script>
  import { goto, invalidate } from '$app/navigation';
  import { fade, slide } from 'svelte/transition';
  import { createForm } from "svelte-forms-lib";
  import { validateEmail } from "$lib/functions/functions.js";
  import { snackbarStore } from '$lib/stores/snackbarMessages';
  import Banner from "$lib/structure/Banner.svelte";
  import Button from "$lib/UI/Button.svelte";
  import FormItem from "$lib/forms/FormItem.svelte";
  import TextInput from "$lib/forms/TextInput.svelte";
  import RadioInput from "$lib/forms/RadioInput.svelte";
  import FloatingButtons from '$lib/UI/FloatingButtons.svelte';
  import LoadingSpinner from '$lib/UI/LoadingSpinner.svelte';
  import config from "$lib/functions/config";
  import * as api from '$lib/api';

  let submitting = $state(false);
  let typeOptions = [];

  for (let i in config.userTypes) {
    typeOptions.push({id: config.userTypes[i].id, name: config.userTypes[i].label})
  }
  
  // set up the form
  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues: {
      email: "",
      first_name: "",
      hr_id: "",
      last_name: "",
      password: "",
      password_confirm: "",
      type: "",
    },
    validate: async values => {
      let errs = {};
      if (values.type === "") {
        errs["type"] = "User type is required";
      }
      if (values.first_name === "") {
        errs["first_name"] = "First name is required";
      }
      if (values.last_name === "") {
        errs["last_name"] = "Last name is required";
      }
      if (values.email != "" && !validateEmail($form.email)) {
        errs["email"] = "Please enter a valid email address";
      }
      if (values.password === "") {
        errs["password"] = "Password is required";
      }
      else if (values.password.length < 8) {
        errs["password"] = "Password must be at least 8 characters";
      }
      if (values.password_confirm === "") {
        errs["password_confirm"] = "Please confirm the password";
      }
      else if (values.password != values.password_confirm) {
        errs["password_confirm"] = "Passwords don't match";
      }
      return errs;
    },
    onSubmit: async values => {
      submitting = true;
      let response = await api.post(fetch, "/api/users", values);
      if (response.error) {
        $errors.password = response.error.code;
        submitting = false;
      }
      else {
        snackbarStore.addMessage("The user has been added");
        goto("/admin/users");
      }
    }
  });
</script>


<Banner title="Create user" backLink="/admin/users" width="huge" />

<div class="container width-huge" in:fade>
  <div class="sheet width-large">

    <div class="form width-small" in:fade>
      <form onsubmit={handleSubmit}>

        <FormItem label="User type" id="edit-type" errorMessage={$errors.type}>
          <RadioInput name="edit-type" bind:value={$form.type} options={typeOptions} />
        </FormItem>

        {#if $form.type != "" && $form.type != "participant"}
          <div transition:slide>
            <FormItem label="OEL HR ID" id="edit-hr_id" description="For team member and administrator users only" errorMessage={$errors.hr_id}>
              <div class="width-tiny">
                <TextInput id="edit-hr_id" on:change={handleChange} bind:value={$form.hr_id} />
              </div>
            </FormItem>
          </div>
        {/if}

        <FormItem label="First name" id="edit-first_name" errorMessage={$errors.first_name}>
          <TextInput id="edit-first_name" on:change={handleChange} bind:value={$form.first_name} />
        </FormItem>
        
        <FormItem label="Last name" id="edit-last_name" errorMessage={$errors.last_name}>
          <TextInput id="edit-last_name" on:change={handleChange} bind:value={$form.last_name} />
        </FormItem>

        <FormItem label="Email" description="If known" id="edit-email" errorMessage={$errors.email}>
          <TextInput id="edit-email" autocomplete="off" on:change={handleChange} bind:value={$form.email} />
        </FormItem>

        <FormItem label="Password" description="Minimum 8 characters" id="edit-password" errorMessage={$errors.password}>
          <TextInput id="edit-password" autocomplete="off" type="password" on:change={handleChange} bind:value={$form.password} />
        </FormItem>

        <FormItem label="Confirm password" id="edit-password_confirm" errorMessage={$errors.password_confirm}>
          <TextInput id="edit-password_confirm" type="password" on:change={handleChange} bind:value={$form.password_confirm} />
        </FormItem>

        <FloatingButtons width="xlarge">
          <Button caption="Create user" type="contained" disabled={submitting} />
          <Button caption="Cancel" type="outlined" href="/admin/users" />
          {#if submitting}
            <LoadingSpinner size="small" />
          {/if}
        </FloatingButtons>

      </form>
    </div>

  </div>
</div>