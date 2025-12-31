<script>
  import { goto } from '$app/navigation';
  import { createForm } from "svelte-forms-lib";
  import { snackbarStore } from '$lib/stores/snackbarMessages';
  import { validatePassword } from '$lib/functions/functions';
  import FormItem from "$lib/forms/FormItem.svelte";
  import TextInput from "$lib/forms/TextInput.svelte";
  import Button from "$lib/UI/Button.svelte";
  import LoginBox from '$lib/structure/LoginBox.svelte';
  import * as api from '$lib/api';
  
  let { data } = $props();
  let submitting = $state(false);
  
  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues: {
      password: "",
      password_confirm: ""
    },
    validate: values => {
      let errs = {};
      let {valid, message} = validatePassword(values.password);
      if (!valid) {
        errs["password"] = message;
      }
      else if (values.password_confirm === "") {
        errs["password_confirm"] = "Please confirm your password";
      }
      else if (values.password != values.password_confirm) {
        errs["password_confirm"] = "Passwords don't match";
      }
      return errs;
    },
    onSubmit: async values => {
      submitting = true;
      await api.post(fetch, "/api/register/reset-password", {
        token: data.token, 
        password: values.password
      });
      goto("/login");
      snackbarStore.addMessage("Your password has been successfully reset");
    }
  });
</script>


<div id="content" class="container width-xlarge">
  
  <LoginBox title="Reset your password">
    
    <form onsubmit={handleSubmit}>
    
      <FormItem label="Enter your new password" id="password" errorMessage={$errors.password}>
        <TextInput type="password" id="password" on:change={handleChange} bind:value={$form.password} />
      </FormItem>

      <FormItem label="Confirm your new password" id="password_confirm" errorMessage={$errors.password_confirm}>
        <TextInput type="password" id="password_confirm" on:change={handleChange} bind:value={$form.password_confirm} />
      </FormItem>

      <Button caption="Reset password" type="contained" loading={submitting} disabled={submitting} />
      
    </form>

  </LoginBox>
  
</div>
