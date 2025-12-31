<script>
  import { onMount } from 'svelte';
  import { beforeNavigate, goto } from '$app/navigation';
  import { createForm } from "svelte-forms-lib";
  import { snackbarStore } from '$lib/stores/snackbarMessages';
  import Button from "$lib/UI/Button.svelte";
  import FormItem from "$lib/forms/FormItem.svelte";
  import TextInput from "$lib/forms/TextInput.svelte";
  import FileInput from "$lib/forms/FileInput.svelte";
  import FloatingButtons from '$lib/UI/FloatingButtons.svelte';
  import LoadingSpinner from '$lib/UI/LoadingSpinner.svelte';
  import Modal from "$lib/UI/Modal.svelte";
  import * as api from '$lib/api';

  let { user, currentUser, onUpdate, type = "" } = $props();  
  let submitting = $state(false);
  let showPasswordPopup = $state(false);
  let showDeletePopup = $state(false);
  let changed = $state(false);
  let canDelete = $state(false);
  let password = $state("");
  let passwordConfirm = $state("");
  let errorPassword = $state("");
  let errorPasswordConfirm = $state("");
 
  // set up the form
  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues: {
      avatar_url: user.avatar_url,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    },
    validate: async values => {
      let errs = {};
      if (values.first_name === "") {
        errs["first_name"] = "First name is required";
      }
      if (values.last_name === "") {
        errs["last_name"] = "Last name is required";
      }
      return errs;
    },
    onSubmit: async values => {
      submitting = true;
      changed = false;
      await api.patch(fetch, "/api/users/" + user.id, values);
      location.href = location.href;
      /*
      onUpdate();
      snackbarStore.addMessage("The changes have been saved");
      submitting = false;
      window.scrollTo(0, 0);
      */
    }
  });

  onMount(async () => {
    window.scrollTo(0, 0);
  });

  async function updatePassword() {
    errorPassword = "";
    errorPasswordConfirm = "";
    if (password != "") {
      if (password.length < 8) {
        errorPassword = "Password must be at least 8 characters";
        return;
      }
      else if (password != passwordConfirm) {
        errorPasswordConfirm = "Passwords don't match";
        return;
      }
    }
    submitting = true;
    changed = false;
    await api.patch(fetch, "/api/users/" + user.id, {password});
    onUpdate();
    snackbarStore.addMessage("The password has been changed");
    submitting = false;
    showPasswordPopup = false;
  }

  // make sure the user is not related to any project (before deletion)
  async function checkDeletion() {
    let response = await api.get(fetch, "/api/projects", {limit: 1, profile_id: user.id});
    canDelete = !response.projects.length;
    showDeletePopup = true;
  }

  // delete the user
  async function deleteUser() {
    submitting = true;
    await api.del(fetch, "/api/users/" + user.id);
    changed = false;
    snackbarStore.addMessage("The user has been deleted");
    goto ("/admin/users")
  }

  // show a message if the user tries to navigate away after having made a change
  beforeNavigate(({ cancel }) => {
    if (changed) {
      if (!confirm('Are you sure you want to leave this page? You have unsaved changes that will be lost. Click Cancel to return to the page to save your changes, or OK to discard the changes.')) {
        cancel();
      }
    }
  });
</script>


<div class="form width-small">
  <form autocomplete="off" onsubmit={handleSubmit} onchange={() => changed = true}>

    <FormItem label="First name" id="first_name" errorMessage={$errors.first_name}>
      <TextInput id="first_name" on:change={handleChange} bind:value={$form.first_name} />
    </FormItem>
    
    <FormItem label="Last name" id="last_name" errorMessage={$errors.last_name}>
      <TextInput id="last_name" on:change={handleChange} bind:value={$form.last_name} />
    </FormItem>

    <FormItem label="Email" description="Enter your preferred email address if you have one" id="edit-email" errorMessage={$errors.email}>
      <TextInput id="edit-email" autocomplete="false" on:change={handleChange} bind:value={$form.email} />
    </FormItem>
  
    <FormItem label="Profile photo" description="Minimum size 160 x 160 pixels" id="avatar" errorMessage={$errors.avatar_url}>
      <FileInput 
        type="image"
        thumbnailWidth="100"
        thumbnailType="face"
        id="user-avatar" 
        folder="user-avatars" 
        bind:url={$form.avatar_url} 
        onError={(message) => $errors.avatar_url = message} 
      />
    </FormItem>

    <FormItem label="">
      <a onclick={() => showPasswordPopup = true}>Change password</a>
    </FormItem>
  
    <FloatingButtons width="xlarge">
      <Button caption="Save" type="contained" disabled={submitting} />
      {#if type != "account"}
        <Button caption="Delete user" type="outlined" disabled={submitting} noSubmit={true} on:click={checkDeletion} />
      {/if}
      {#if submitting}
        <LoadingSpinner size="small" />
      {/if}
    </FloatingButtons>

  </form>
</div>

{#if showPasswordPopup}
  <Modal close={() => showPasswordPopup = false}>
    <div style="text-align: left">
      <FormItem label="Password" description="Minimum 8 characters" id="edit-password" errorMessage={errorPassword}>
        <TextInput id="edit-password" autocomplete="false" type="password" on:change={handleChange} bind:value={password} />
      </FormItem>
      <FormItem label="Confirm password" id="edit-password_confirm" errorMessage={errorPasswordConfirm}>
        <TextInput id="edit-password_confirm" autocomplete="false" type="password" on:change={handleChange} bind:value={passwordConfirm} />
      </FormItem>
      <div class="actions">
        <Button type="contained" caption="Change password" on:click={updatePassword} disabled={submitting} loading={submitting} />
        <Button type="outlined" caption="Cancel" on:click={() => showPasswordPopup = false} disabled={submitting} noSubmit={true} />
      </div>
    </div>
  </Modal>
{/if}

{#if showDeletePopup}
  <Modal showCloseButton={false} close={() => showDeletePopup = false}>
    <div style="text-align: left">
      {#if canDelete}
        <p>Are you sure you want to delete this user? This cannot be undone.</p>
        <div class="actions">
          <Button type="contained" caption="Delete user" on:click={deleteUser} disabled={submitting} loading={submitting} />
          <Button type="outlined" caption="Cancel" on:click={() => showDeletePopup = false} disabled={submitting} noSubmit={true} />
        </div>
      {:else}
        <p>You cannot delete this user as they are related to a project. Please remove them from all related projects first to delete them.</p>
        <Button type="outlined" caption="Close" on:click={() => showDeletePopup = false} disabled={submitting} noSubmit={true} />
      {/if}
    </div>
  </Modal>
{/if}
