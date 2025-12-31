<script>
  import { fade } from "svelte/transition";

  let { text = "No results found" } = $props();
</script>


<div class="wrap" in:fade>
  <div class="text">
    {text}
  </div>
  <div class="image">
    <img src="https://xcjtqrmrxkucjrtgxtdq.supabase.co/storage/v1/object/public/files/public/misc/empty-state.png" alt="No result" />
  </div>
</div>


<style>
  .wrap {
    margin-top: 1rem;
  }

  .image {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
  }
</style>