<script>
  import { page } from '$app/stores';
  import { fade, slide } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { createForm } from "svelte-forms-lib";
  import FormItem from "$lib/forms/FormItem.svelte";
  import TextInput from "$lib/forms/TextInput.svelte";
  import Button from "$lib/UI/Button.svelte";
  import LoginBox from '$lib/structure/LoginBox.svelte';
  import SingleCheckboxInput from '$lib/forms/SingleCheckboxInput.svelte';
  import * as api from '$lib/api';

  let { data } = $props();
  let errorMessage = $state(null);
  let processing = $state(false);

  // enable the enter key
  const onKeyPress = e => {
    if (e.charCode === 13) login();
  };
  
  // set up the form
  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues: {
      password: "",
      email: "",
    },
    validate: values => {
      let errs = {};
      if (values.email === "") {
        errs["email"] = "Please enter your email";
      }
      if (values.password === "") {
        errs["password"] = "Please enter your password";
      }
      return errs;
    },
    onSubmit: values => {
      login(values);
    }
  });

  onMount(() => {
    document.getElementById("email").focus();
  });

  async function login(values) {
    processing = true;
    errorMessage = null;
    let data = {
      email: values.email,
      password: values.password
    };
    let response = await api.post(fetch, "/api/login", data);
    if (response.error) {
      errorMessage = response.error;
      processing = false;
      return;
    }
    let redirectUrl = ($page.url.searchParams.get("destination"))?$page.url.searchParams.get("destination"):"/";
    location.href = redirectUrl;
  }
</script>


<LoginBox>

  <form onsubmit={handleSubmit}>

    <FormItem label="Email" id="email" errorMessage={$errors.email}>
      <TextInput id="email" on:change={handleChange} bind:value={$form.email} on:keypress={onKeyPress} />
    </FormItem>
    
    <FormItem label="Password" id="password" errorMessage={$errors.password}>
      <TextInput id="password" on:change={handleChange} bind:value={$form.password} on:keypress={onKeyPress} type="password" />
    </FormItem>

    <Button caption="Sign in" type="contained" style="full-width" disabled={processing} loading={processing} />

  </form>

  {#if errorMessage}
    <div class="error" in:slide>
      {errorMessage}
    </div>
  {/if}

  <!--<div class="forgot-password"><a href="/actions/forgot-password">Forgotten your password?</a></div>-->

</LoginBox>


<style>
  .error {
    margin-top: 1rem;
    color: #f00;
  }

  .forgot-password {
    margin-top: 1rem;
  }
</style>