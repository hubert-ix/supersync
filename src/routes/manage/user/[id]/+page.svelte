<script>
  import { page } from '$app/state';
  import { invalidate } from '$app/navigation';
  import { fade } from 'svelte/transition';
  import config from '$lib/functions/config';
  import Banner from '$lib/structure/Banner.svelte';
  import Button from "$lib/UI/Button.svelte";
  import UserAvatar from '$lib/structure/UserAvatar.svelte';
  import UserForm from './UserForm.svelte';

  let { data } = $props();  
  let user = data.user;
  let viewURL = page.url.searchParams.get("returnURL") ?? user.path;
  
  function onUpdate() {
    invalidate("user");
  }
</script>


<Banner title="" width="huge">
  <div class="user-banner">
    <UserAvatar {user} />
    <div class="banner-info">
      <h1>{user.display_name}</h1>
      {config.userTypes.find(obj => obj.id == user.type)?.label} / User ID: {user.user_id}
    </div>
  </div>
</Banner>

<div class="container width-huge" in:fade>
  <div class="sheet width-xlarge">
        
    <div class="edit-button">
      <Button caption="View participant profile" type="contained" style="yellow" icon="view" href={viewURL} />
    </div>

    <UserForm {user} currentUser={data.currentUser} {onUpdate} />
  </div>
</div>


<style>
  .user-banner {
    justify-content: flex-start;
    align-items: flex-start;
    display: flex;
  }

  h1 {
    margin: 0;
  }

  .banner-info {
    color: #bdbdbd;
    grid-column-gap: .5rem;
    grid-row-gap: .5rem;
    flex-flow: column;
    font-size: 1.25rem;
    display: flex;
    margin-left: 2rem;
  }
</style>