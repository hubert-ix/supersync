<script>
  import { supabase } from '$lib/stores/supabase';

  let { user, size = "medium", style = "" } = $props();
  let imageUrl = $state();
  let initials = $state("");
  let resizedWidth = 160;
  
  $effect(() => {
    if (user?.display_name) {
      initials = user.display_name.split(" ").map((n)=>n[0]).slice(0,2).join("");
    }
    if (user?.avatar_url) {
      /*switch(size) {
        case "large": resizedWidth = 160; break;
        case "medium": resizedWidth = 96; break;
        case "small": resizedWidth = 80; break;
        case "tiny": resizedWidth = 48; break;
        case "tiniest": resizedWidth = 24; break;
      }*/
      let temp = user.avatar_url.split("files/");
      let response = $supabase.storage.from('files').getPublicUrl(temp[1], {
        transform: {
          width: resizedWidth,
          height: resizedWidth,
        }
      });
      imageUrl = response.data.publicUrl;
      //imageUrl = user.avatar_url.split("||")[0] + "?tr=w-" + resizedWidth + ",h-" + resizedWidth + ",fo-face,z-0.8";
    }
    else {
      imageUrl = null;
    }
  });
</script>


{#if user}
  <div class="user-avatar {size} {style}">
    {#if imageUrl}
      <img src={imageUrl} class="avatar" alt="{user.display_name}" />
    {:else}
      <div class="initials avatar">
        {initials}
      </div>
    {/if}
  </div>
{/if}


<style>  
  .avatar {
    border: 2px solid #fff;
    border-radius: 50%; 
    background: #96cbc4;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, .24)
  }
  
  .user-avatar.border .avatar {
    border-width: 4px;
    border-color: #d0043c;
  }
  
  .avatar.initials {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #000;
    font-size: 18px;
    font-weight: 500;
    text-transform: uppercase;
  }
  
  .user-avatar.large .avatar {
    width: 160px; 
    min-width: 160px; 
    height: 160px; 
    font-size: 28px;
  }
  
  .user-avatar.medium .avatar {
    width: 96px; 
    min-width: 96px;
    height: 96px;
    font-size: 18px;
  }
  
  .user-avatar.small .avatar {
    width: 80px; 
    min-width: 80px; 
    height: 80px;
    font-size: 16px;
  }
  
  .user-avatar.tiny .avatar {
    width: 48px; 
    min-width: 48px; 
    height: 48px;
    font-size: 14px;
  }
  
  .user-avatar.tiniest .avatar {
    width: 32px; 
    min-width: 32px; 
    height: 32px;
    font-size: 10px;
    border: none;
  }
</style>