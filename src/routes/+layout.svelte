<script>
  import { PUBLIC_SITE_NAME } from '$env/static/public';
  import { page, navigating, updated } from '$app/stores';
  import { onNavigate, invalidate } from '$app/navigation';
  import { onMount } from 'svelte';
  import { currentUser } from '$lib/stores/currentUser';
  import { supabase } from '$lib/stores/supabase';
  import { superAdminSettings } from '$lib/stores/superAdminSettings';
  import Header from '$lib/structure/Header.svelte';
  import Footer from '$lib/structure/Footer.svelte';
  import Preloader from '$lib/structure/Preloader.svelte';
  import Snackbars from "$lib/UI/Snackbars.svelte";
  import Nav from "$lib/structure/Nav.svelte";
  import * as api from '$lib/api';
  import './styles.css';
  
  let { data, children } = $props();
  let session = data.session;
  let showNav = $state(false);
  let segment = $derived($page.url.pathname.split("/")[1]);

  $currentUser = data.currentUser;
  $supabase = data.supabase;

  // for page transitions
  onNavigate((navigation) => {
    if (!document.startViewTransition) return;
    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
  
  function hideSideBars() {
    showNav = false;
  }
  
  async function logout() {
    await api.post(fetch, "/api/logout");
    location.href = "/";
  }
</script>


<svelte:head>
  <link rel="icon" href={data.favicon} />
  <title>{$page.data.pageTitle??''} | {PUBLIC_SITE_NAME}</title>
</svelte:head>

<div class="app" data-sveltekit-reload={$updated ? "" : "off"} data-sveltekit-preload-data="false">

  {#if $navigating}
    <Preloader />
  {/if}

  <Header currentUser={data.currentUser} />

  <main class={segment}>
    {@render children()}
  </main>

  {#if showNav}
    <Nav 
      {segment} 
      {logout} 
      currentUser = {data.currentUser} 
    />
  {/if}

  <Snackbars />

</div>

<svelte:body on:click={hideSideBars} />
