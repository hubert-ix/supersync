<script>
  let { segment } = $props();
  let imgSrc = $derived.by(() => {
    let src = null;
    switch(segment) {
      case "": 
      case "participant-projects":
        src = "https://xcjtqrmrxkucjrtgxtdq.supabase.co/storage/v1/object/public/files/public/backgrounds/dashboard.jpg"; break;
      case "account": src = "https://xcjtqrmrxkucjrtgxtdq.supabase.co/storage/v1/object/public/files/public/backgrounds/account.jpg"; break;
      case "clients": src = "https://xcjtqrmrxkucjrtgxtdq.supabase.co/storage/v1/object/public/files/public/backgrounds/clients.jpg"; break;
      case "enrolments":
      case "participant-enrolments":
      case "checklists":
      case "courses": src = "https://xcjtqrmrxkucjrtgxtdq.supabase.co/storage/v1/object/public/files/public/backgrounds/courses2.jpg"; break;
      case "manage": src = "https://xcjtqrmrxkucjrtgxtdq.supabase.co/storage/v1/object/public/files/public/backgrounds/create.jpg"; break;
      case "participants": src = "https://xcjtqrmrxkucjrtgxtdq.supabase.co/storage/v1/object/public/files/public/backgrounds/participants.jpg"; break;
      case "feedback":
      case "people":
      case "projects": src = "https://xcjtqrmrxkucjrtgxtdq.supabase.co/storage/v1/object/public/files/public/backgrounds/projects.jpg"; break;
      case "admin": src = "https://xcjtqrmrxkucjrtgxtdq.supabase.co/storage/v1/object/public/files/public/backgrounds/admin.jpg"; break;
      case "login": src = "https://xcjtqrmrxkucjrtgxtdq.supabase.co/storage/v1/object/public/files/public/backgrounds/login.jpg"; break;
    }
    return src;
  });
</script>


{#if imgSrc}
  <div class="background">
    <img src={imgSrc} alt="Background" />
  </div>
{/if}


<style>
  .background {
    min-height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
  }

  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
    position: fixed;
  }
</style>