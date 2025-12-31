<script>
  import { fade } from 'svelte/transition';
  import UserAvatar from "$lib/structure/UserAvatar.svelte";
	
  let { currentUser } = $props();
</script>


<header in:fade>
  <div class="container header width-huge">
    <div class="header-left logo">
      Super Sync
    </div>
    <div class="header-right">
      {#if currentUser.loggedIn}
        <nav class="admin">
          <a href="/manage/create">
            <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 7c-.55 0-1 .45-1 1v3H8c-.55 0-1 .45-1 1s.45 1 1 1h3v3c0 .55.45 1 1 1s1-.45 1-1v-3h3c.55 0 1-.45 1-1s-.45-1-1-1h-3V8c0-.55-.45-1-1-1zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8z"></path></svg>
          </a>          
          <a href="/admin/users">
            <svg viewBox="0 0 24 24"><path fill="currentColor" d="M19.43 12.98c.04-.32.07-.64.07-.98c0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46a.5.5 0 0 0-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65A.488.488 0 0 0 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1a.566.566 0 0 0-.18-.03c-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98c0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46a.5.5 0 0 0 .61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03c.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73c0 .21-.02.43-.05.73l-.14 1.13l.89.7l1.08.84l-.7 1.21l-1.27-.51l-1.04-.42l-.9.68c-.43.32-.84.56-1.25.73l-1.06.43l-.16 1.13l-.2 1.35h-1.4l-.19-1.35l-.16-1.13l-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7l-1.06.43l-1.27.51l-.7-1.21l1.08-.84l.89-.7l-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13l-.89-.7l-1.08-.84l.7-1.21l1.27.51l1.04.42l.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43l.16-1.13l.2-1.35h1.39l.19 1.35l.16 1.13l1.06.43c.43.18.83.41 1.23.71l.91.7l1.06-.43l1.27-.51l.7 1.21l-1.07.85l-.89.7l.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4s4-1.79 4-4s-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2z"></path></svg>
          </a>
        </nav>
        <nav class="account">
          <a href="/account">
            <UserAvatar user={currentUser} size="tiny" />
          </a>
        </nav>
      {/if}
    </div>
  </div>
</header>


<style>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 1rem;
    padding-bottom: 1rem;
    width: 100%;
  }

  .header-left, .header-right {
    display: flex;
    align-items: center;
  }

  .logo {
    font-family: neue-haas-grotesk-display, sans-serif;
	  font-weight: 600;
    font-size: 1.5rem;
    color: #000;
  }

  nav {
    display: flex;
    align-items: center;
    color: #fff;
  }

  nav a {
    color: #212121;
    text-decoration: none;
    cursor: pointer;
    transition: color .4s;
  }

  nav a {
    position: relative;
    margin: 0 1rem;
    display: flex;
    cursor: pointer;
  }

  nav.admin a {
    margin: 0 0.75rem;
  }

  nav a:hover {
    color: #9e9e9e;
  }

  nav svg {
    width: 24px;
  }
</style>