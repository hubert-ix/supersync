<script>
  let { url, icon = "", style = "" } = $props();
</script>


<div class="backlink {style}">
  <a href={url} class="backlink">
    {#if icon == ""}
      <img src="/images/back-arrow-black.png" width="16" alt="Back" />
    {:else if icon == "view"}
      <img src="/images/eye-outline.svg" width="24" alt="View" />
    {:else if icon == "edit"}
    <img src="/images/pencil-outline.svg" width="24" alt="Edit" />
    {/if}
  </a>
</div>


<style>
  a.backlink {
    display: flex;
    width: 3rem;
    height: 3rem;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: #212121;
    background-color: #f0f0ff52;
    transition: background-color .4s;
  }

  a.backlink:hover {
    opacity: 1;
    background-color: #f0f0ff;
  }

  .grey a.backlink {
    background-color: #52527a29;
  }

  .grey a.backlink:hover {
    background-color: #52527a52;
  }
</style>