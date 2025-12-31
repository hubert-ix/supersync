<script>
  import { goto } from '$app/navigation';
  import { fade } from 'svelte/transition';
  import { createForm } from "svelte-forms-lib";
  import { validateEmail } from "$lib/functions/functions.js";
  import { snackbarStore } from '$lib/stores/snackbarMessages';
  import FormItem from "$lib/forms/FormItem.svelte";
  import TextInput from "$lib/forms/TextInput.svelte";
  import Button from "$lib/UI/Button.svelte";
  import LoginBox from '$lib/structure/LoginBox.svelte';
  import * as api from '$lib/api';
  
  let error = "";
  let submitting = $state(false);
  
  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues: {
      email: "",
    },
    validate: values => {
      let errs = {};
      if (values.email === "") {
        errs["email"] = "Please enter your email address";
      }
      else if (!validateEmail($form.email)) {
        $errors.email = "Please enter a valid email address";
      }
      return errs;
    },
    onSubmit: async values => {
      submitting = true;
      error = ""; 
      await api.post(fetch, "/api/register/send-password-reset-link", {
        email: $form.email
      });
      snackbarStore.addMessage("A link to reset your password has been sent to your email address");
      goto("/login")
    }
  });
</script>


<div id="content" class="container width-xlarge" in:fade>
  
  <LoginBox title="Reset your password">

    <form onsubmit={handleSubmit}>
    
      <FormItem label="Your email address" id="email" errorMessage={$errors.email}>
        <TextInput id="email" on:change={handleChange} bind:value={$form.email} />
      </FormItem>

      <Button caption="Send password reset" type="contained" style="full-width" loading={submitting} />
      
    </form>
  
  </LoginBox>
  
</div>
  