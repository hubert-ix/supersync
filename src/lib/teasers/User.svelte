<script>
  import { fade } from 'svelte/transition';
  import UserAvatar from "$lib/structure/UserAvatar.svelte";
  
  let { user } = $props();
</script>


{#if user.path}
  <a class="item" href={user.path} in:fade>
    <UserAvatar {user} size="tiny" />
    <div class="info">
      {user.display_name}
    </div>
  </a>
{/if}


<style>
  a.item {
    background-color: #00968829;
    border-radius: .5rem;
    padding: 1rem;
    text-decoration: none;
    display: flex;
    align-items: center;
  }
  
  a.item:hover {
    opacity: 1;
  }

  .info {
    margin-left: 1rem;
    text-decoration: underline;
  }
</style>