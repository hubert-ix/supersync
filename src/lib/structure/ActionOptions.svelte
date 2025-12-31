<script>
  import { goto } from '$app/navigation';
  import { fade } from 'svelte/transition';
  import { createForm } from "svelte-forms-lib";
  import { snackbarStore } from '$lib/stores/snackbarMessages';
  import { currentUser } from '$lib/stores/currentUser';
  import ContextMenu from "$lib/UI/ContextMenu.svelte";
  import Modal from "$lib/UI/Modal.svelte";
  import Button from "$lib/UI/Button.svelte";
  import FormItem from "$lib/forms/FormItem.svelte";
  import TextInput from "$lib/forms/TextInput.svelte";
  import * as api from '$lib/api';
    
  let {
    content = {author: {id: null}},
    name = "",
    editRedirect = true,
    showDeleteOption = false,
    shortLabels = false,
    style = null,
    deleteObject,
    editObject
  } = $props();

  let showReportPopup = $state(false);
  let reporting = $state(false);
  let actionOptions = [];
  let userCanEdit = false;
  let userCanReport = ($currentUser.loggedIn && name == "post");
  let label;
  let isOwnContent = ($currentUser.loggedIn && ($currentUser.id == content.author?.id));

  if (content.content_type_name == "comment" || content.content_type_name == "reply") {
    userCanEdit = (isOwnContent || $currentUser.permissions?.administrator);
  }
  else {
    userCanEdit = ($currentUser.permissions["edit_any_" + name] || ($currentUser.permissions["edit_own_" + name] && isOwnContent));
  }
  
  if ($currentUser.loggedIn) {
    if (userCanEdit) {
      label = (shortLabels)?"Edit":"Edit this " + name;
      actionOptions.push({value: "edit", label: label});
      if (showDeleteOption) {
        label = (shortLabels)?"Delete":"Delete this " + name
        actionOptions.push({value: "delete", label: label});
      }
    }
    if (userCanReport) {
      label = (shortLabels)?"Report":"Report this " + name
      actionOptions.push({value: "report", label: label});
    }
  }
  
  // set up the report form
  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues: {
      reason: "",
    },
    validate: values => {
      let errs = {};
      if (values.reason === "") {
        errs["reason"] = "Please enter a reason";
      }
      return errs;
    },
    onSubmit: async values => {
      reporting = true;
      let data = {
        content_id: content.id,
        content_type_name: content.content_type_name,
        reason: values.reason,
        user_id: $currentUser.id
      }
      await api.post(fetch, "/api/report_content", data);
      // redirect
      hideReportForm();
      reporting = false;
      snackbarStore.addMessage("This " + name + " has been reported");
    }
  });

  function contextMenuResponse(option) {
    switch(option) {
      case "report": showReportForm(); break;
      case "edit": edit(); break;
      case "delete": deleteObject(); break;
    }
  }
  
  function edit() {
    if (editRedirect) {
      goto("/manage/" + name + "/" + content.id + "?destination=" + content.path);
    }
    else {
      editObject();
    }
  }
  
  function showReportForm() {
    showReportPopup = true;
    $errors.reason = "";
  }
  
  function hideReportForm() {
    showReportPopup = false;
  }
  
  function focusReportForm() {
    document.getElementById("report-reason").focus();
  }
</script>


{#if $currentUser.loggedIn && actionOptions.length}
  <div class="action-options {style}" transition:fade={{duration: 100}}>
    <ContextMenu options={actionOptions} style="{style} circle" onOptionSelected={(option) => contextMenuResponse(option)} />
  </div>
{/if}

{#if showReportPopup}
  <Modal close={hideReportForm} on:show={focusReportForm}>
    <div style="text-align: left">
      <form onsubmit={handleSubmit}>
        <h3>Report this {name}</h3>
        <FormItem label="Reason" id="report-reason" errorMessage={$errors.reason}>
          <TextInput placeholder="Type in your reason for reporting this {name}" id="report-reason" on:change={handleChange} bind:value={$form.reason} />
        </FormItem>
        <div class="actions">
          <Button caption="Send" type="contained" disabled={reporting} loading={reporting} />
          <Button caption="Cancel" on:click={hideReportForm} disabled={reporting} noSubmit={true} />
        </div>
      </form>
    </div>
  </Modal>
{/if}


<style>
  .action-options {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 2;
  }

  .action-options.page {
    top: 70px;
  }
</style>