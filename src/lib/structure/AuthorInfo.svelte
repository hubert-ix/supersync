<script>
  import dayjs from "dayjs";
  import advancedFormat from 'dayjs/plugin/advancedFormat.js';
  import UserAvatar from "$lib/structure/UserAvatar.svelte";

  let {
    author = null,
    date = null,
    size = "small",
    style = ""
  } = $props();

  dayjs.extend(advancedFormat);
</script>


<div class="author {size} {style}">
  <div class="image">
    <UserAvatar user={author} {size} />
  </div>
  <div class="info">
    <div class="name">
      {#if author}
        {author.display_name}
      {:else}
        [user removed] <!-- TODO: do something about this case -->
      {/if}
    </div>
    {#if date}
      <div class="date">
        {dayjs(date).format("Do MMMM YYYY")}
      </div>
    {:else if author && author.job_title}
      {author.job_title}
    {/if}
  </div>
</div>


<style>  
  .author {
    display: flex; 
    align-items: center;
    color: #757575;
  }
  
  .image {
    margin-right: 16px;
  }
  
  .name {
    color: #000; 
    font-weight: 500;
  }
  
  .white .name {
    color: #fff;
  }
  
  .white .date {
    color: #e0e0e0;
  }
  
  .small .name {
    font-size: 15px; 
    line-height: 26px; 
    letter-spacing: 0.5px;
  }
  
  .medium .name {
    font-size: 18px; 
    line-height: 26px; 
    letter-spacing: 1px;
  }
</style>