<script>
  import { goto, beforeNavigate, invalidate } from '$app/navigation';
  import { fade } from 'svelte/transition';
  import { createForm } from "svelte-forms-lib";
  import { snackbarStore } from '$lib/stores/snackbarMessages';
  import Button from "$lib/UI/Button.svelte";
  import FormItem from "$lib/forms/FormItem.svelte";
  import TextInput from "$lib/forms/TextInput.svelte";
  import AddressInput from '$lib/forms/AddressInput.svelte';
  import TelephoneInput from '$lib/forms/TelephoneInput.svelte';
  import FloatingButtons from '$lib/UI/FloatingButtons.svelte';
  import LoadingSpinner from '$lib/UI/LoadingSpinner.svelte';
  import SelectDropdown from '$lib/UI/SelectDropdown.svelte';
  import Modal from "$lib/UI/Modal.svelte";
  import countries from '$lib/functions/countries';
  import * as api from '$lib/api';
 
  let {
    client = null,
  } = $props();

  let mode = (client)?"edit":"add";
  let changed = $state(false);
  let submitting = $state(false);
  let showPopup = $state(false);
  let canDelete = $state(false);
  let buttonText = (mode == "add")?"Create client":"Save client details";
  let countryOptions = [{
    value: null,
    label: "Select country..."
  }];

  for (let i in countries.list) {
    countryOptions.push({
      value: countries.list[i].id,
      label: countries.list[i].label,
    });
  }

  // set up the form
  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues: {
      address_line1: (mode == "edit")?client.address_line1:"",
      address_line2: (mode == "edit")?client.address_line2:"",
      address_line3: (mode == "edit")?client.address_line3:"",
      address_city: (mode == "edit")?client.address_city:"",
      address_region: (mode == "edit")?client.address_region:"",
      address_postcode: (mode == "edit")?client.address_postcode:"",
      address_country: (mode == "edit")?client.address_country:"",
      contact_email: (mode == "edit")?client.contact_email:"",
      contact_name: (mode == "edit")?client.contact_name:"",
      contact_telephone: (mode == "edit")?client.contact_telephone:"",
      contact_telephone_prefix: (mode == "edit")?client.contact_telephone_prefix:"",
      contact_office_telephone: (mode == "edit")?client.contact_office_telephone:"",
      contact_office_telephone_prefix: (mode == "edit")?client.contact_office_telephone_prefix:"",
      invoicing_address_name: (mode == "edit")?client.invoicing_address_name:"",
      invoicing_address_line1: (mode == "edit")?client.invoicing_address_line1:"",
      invoicing_address_line2: (mode == "edit")?client.invoicing_address_line2:"",
      invoicing_address_line3: (mode == "edit")?client.invoicing_address_line3:"",
      invoicing_address_city: (mode == "edit")?client.invoicing_address_city:"",
      invoicing_address_region: (mode == "edit")?client.invoicing_address_region:"",
      invoicing_address_postcode: (mode == "edit")?client.invoicing_address_postcode:"",
      invoicing_country: (mode == "edit")?client.invoicing_country:"",
      invoicing_email: (mode == "edit")?client.invoicing_email:"",
      invoicing_name: (mode == "edit")?client.invoicing_name:"",
      invoicing_position: (mode == "edit")?client.invoicing_position:"",
      invoicing_company_number: (mode == "edit")?client.invoicing_company_number:"",
      invoicing_company_telephone: (mode == "edit")?client.invoicing_company_telephone:"",
      invoicing_company_telephone_prefix: (mode == "edit")?client.invoicing_company_telephone_prefix:"",
      invoicing_telephone: (mode == "edit")?client.invoicing_telephone:"",
      invoicing_telephone_prefix: (mode == "edit")?client.invoicing_telephone_prefix:"",
      invoicing_vat: (mode == "edit")?client.invoicing_vat:"",
      invoicing_website: (mode == "edit")?client.invoicing_website:"",
      registration_number: (mode == "edit")?client.registration_number:"",
      title: (mode == "edit")?client.title:"",
      vat_number: (mode == "edit")?client.vat_number:"",
      website: (mode == "edit")?client.website:"",
    },
    validate: values => {
      let errs = {};
      if (values.title === "") {
        errs["title"] = "Client name is required";
      }
      return errs;
    },
    onSubmit: async values => {
      submitting = true;
      changed = false;
      if (mode == "add") {
        let response = await api.post(fetch, "/api/clients", values);
        goto(response.path);
      }
      else {
        await api.patch(fetch, "/api/clients/" + client.id, values);
        snackbarStore.addMessage("The changes have been saved");
        invalidate("client");
        submitting = false;
      }
    }
  });

  // make sure the client does not belong to any project (before deletion)
  async function checkDeletion() {
    let response = await api.get(fetch, "/api/projects", {client_id: client.id});
    canDelete = !response.projects.length;
    showPopup = true;
  }

  // delete the client
  async function deleteClient() {
    submitting = true;
    await api.del(fetch, "/api/clients/" + client.id);
    changed = false;
    snackbarStore.addMessage("The client has been deleted");
    goto ("/admin/content")
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


<div class="form width-small" in:fade>
  <form onsubmit={handleSubmit} onchange={() => changed = true}>
    
    <FormItem label="Client organisation name" id="edit-title" errorMessage={$errors.title}>
      <TextInput id="edit-title" on:change={handleChange} bind:value={$form.title} />
    </FormItem>

    <FormItem label="Client address" id="edit-address" errorMessage={$errors.address}>
      <AddressInput
        id="address"
        includeName={false}
        bind:line1={$form.address_line1}
        bind:line2={$form.address_line2}
        bind:line3={$form.address_line3}
        bind:city={$form.address_city}
        bind:region={$form.address_region}
        bind:postcode={$form.address_postcode}
      />
    </FormItem>

    <FormItem label="Country" id="edit-country">
      <SelectDropdown options={countryOptions} bind:selectedValue={$form.address_country} style="form" />
    </FormItem>

    <FormItem label="Client contact name" id="edit-contact_name" errorMessage={$errors.contact_name}>
      <TextInput id="edit-contact_name" on:change={handleChange} bind:value={$form.contact_name} />
    </FormItem>

    <FormItem label="Client contact email" id="edit-contact_email" errorMessage={$errors.contact_email}>
      <TextInput id="edit-contact_email" on:change={handleChange} bind:value={$form.contact_email} />
    </FormItem>

    <FormItem label="Client mobile number" id="edit-contact_telephone" errorMessage={$errors.contact_telephone}>
      <TelephoneInput id="contact_telephone" bind:prefix={$form.contact_telephone_prefix} bind:number={$form.contact_telephone} />
    </FormItem>

    <FormItem label="Client (office) telephone" id="edit-contact_office_telephone" errorMessage={$errors.contact_office_telephone}>
      <TelephoneInput id="contact_office_telephone" bind:prefix={$form.contact_office_telephone_prefix} bind:number={$form.contact_office_telephone} />
    </FormItem>

    <FormItem label="Client website" id="edit-website" errorMessage={$errors.website}>
      <TextInput id="edit-website" on:change={handleChange} bind:value={$form.website} />
    </FormItem>

    <FormItem label="Company registration number" id="edit-registration_number" errorMessage={$errors.registration_number}>
      <TextInput id="edit-registration_number" on:change={handleChange} bind:value={$form.registration_number} />
    </FormItem>

    <FormItem label="Company VAT number" id="edit-vat_number" errorMessage={$errors.vat_number}>
      <TextInput id="edit-vat_number" on:change={handleChange} bind:value={$form.vat_number} />
    </FormItem>

    <FormItem label="Invoicing name and address (if different from above)" id="edit-address" errorMessage={$errors.invoicing_address}>
      <AddressInput
        id="address"
        bind:name={$form.invoicing_address_name}
        bind:line1={$form.invoicing_address_line1}
        bind:line2={$form.invoicing_address_line2}
        bind:line3={$form.invoicing_address_line3}
        bind:city={$form.invoicing_address_city}
        bind:region={$form.invoicing_address_region}
        bind:postcode={$form.invoicing_address_postcode}
      />
    </FormItem>

    <FormItem label="Country" id="edit-invoicing_country">
      <SelectDropdown options={countryOptions} bind:selectedValue={$form.invoicing_country} style="form" />
    </FormItem>

    <FormItem label="Invoicing contact name" id="edit-invoicing_name" errorMessage={$errors.invoicing_name}>
      <TextInput id="edit-invoicing_name" on:change={handleChange} bind:value={$form.invoicing_name} />
    </FormItem>

    <FormItem label="Invoicing contact position" id="edit-invoicing_position" errorMessage={$errors.invoicing_position}>
      <TextInput id="edit-invoicing_position" on:change={handleChange} bind:value={$form.invoicing_position} />
    </FormItem>

    <FormItem label="Invoicing contact mobile telephone" id="edit-invoicing_telephone" errorMessage={$errors.invoicing_telephone}>
      <TelephoneInput id="invoicing_telephone" bind:prefix={$form.invoicing_telephone_prefix} bind:number={$form.invoicing_telephone} />
    </FormItem>

    <FormItem label="Invoicing company number" id="edit-invoicing_company_number" errorMessage={$errors.invoicing_company_number}>
      <TextInput id="edit-invoicing_company_number" on:change={handleChange} bind:value={$form.invoicing_company_number} />
    </FormItem>

    <FormItem label="Invoicing company VAT number" id="edit-invoicing_vat" errorMessage={$errors.invoicing_vat}>
      <TextInput id="edit-invoicing_vat" on:change={handleChange} bind:value={$form.invoicing_vat} />
    </FormItem>

    <FormItem label="Invoicing contact email" id="edit-invoicing_email" errorMessage={$errors.invoicing_email}>
      <TextInput id="edit-invoicing_email" on:change={handleChange} bind:value={$form.invoicing_email} />
    </FormItem>

    <FormItem label="Invoicing company (office) telephone" id="edit-invoicing_company_telephone" errorMessage={$errors.invoicing_company_telephone}>
      <TelephoneInput id="invoicing_telephone" bind:prefix={$form.invoicing_company_telephone_prefix} bind:number={$form.invoicing_company_telephone} />
    </FormItem>    

    <FormItem label="Invoicing company website" id="edit-invoicing_website" errorMessage={$errors.invoicing_website}>
      <TextInput id="edit-invoicing_website" on:change={handleChange} bind:value={$form.invoicing_website} />
    </FormItem>
    
    <FloatingButtons width="xlarge">
      <Button caption={buttonText} type="contained" disabled={submitting} />
      {#if mode == "add"}
        <Button caption="Cancel" type="outlined" href="/manage/create" disabled={submitting} />
      {:else}
        <Button caption="Delete client" type="outlined" disabled={submitting} noSubmit={true} on:click={checkDeletion} />
      {/if}
      {#if submitting}
        <LoadingSpinner size="small" />
      {/if}
    </FloatingButtons>

  </form>
</div>


{#if showPopup}
  <Modal showCloseButton={false} close={() => showPopup = false}>
    <div style="text-align: left">
      {#if canDelete}
        <p>Are you sure you want to delete this client? This cannot be undone</p>
        <div class="actions">
          <Button type="contained" caption="Delete client" on:click={deleteClient} disabled={submitting} loading={submitting} />
          <Button type="outlined" caption="Cancel" on:click={() => showPopup = false} disabled={submitting} noSubmit={true} />
        </div>
      {:else}
        <p>This client cannot be deleted as it has related projects</p>
        <Button type="outlined" caption="Close" on:click={() => showPopup = false} disabled={submitting} noSubmit={true} />
      {/if}
    </div>
  </Modal>
{/if}