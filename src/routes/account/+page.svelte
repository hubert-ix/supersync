<script>
  import { page } from '$app/stores';
  import { invalidate } from '$app/navigation';
  import { fade } from 'svelte/transition';
  import { breadcrumbs } from '$lib/stores/breadcrumbs';
  import Banner from "$lib/structure/Banner.svelte";
  import Button from '$lib/UI/Button.svelte';
  import UserForm from '../manage/user/[id]/UserForm.svelte';
  
  let { data } = $props();
  let backLink = ($page.url.searchParams.get('returnURL'))?$page.url.searchParams.get('returnURL'):null;
  $breadcrumbs = null;
  
  function onUpdate() {
    invalidate("account");
  }
</script>


<Banner title="Your account">
  <div class="banner-inside">
    <Button caption="Sign out" href="/logout" type="contained" />
  </div>
</Banner>

<div class="container width-huge" in:fade>
  <div class="sheet width-large">
    <UserForm user={data.user} currentUser={data.currentUser} {onUpdate} type="account" supabase={data.supabase} />
  </div>
</div>


<style>
  .banner-inside {
    display: flex;
    align-items: center;
    grid-gap: 1rem;
    margin-top: 1.5rem;
  }
</style>