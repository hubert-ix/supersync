<script>
  import { breadcrumbs } from '$lib/stores/breadcrumbs';

  //breadcrumbs = [{path: "/", label: "Home"}, ...breadcrumbs];
</script>


<div class="breadcrumbs">
  {#each $breadcrumbs as item, index}
    <div class="item">
      {#if item.path}
        <a href={item.path}>{item.label}</a>
      {:else}
        {item.label}
      {/if}
    </div>
    {#if index < $breadcrumbs.length - 1}
      <div class="separator">/</div>
    {/if}
  {/each}
</div>


<style>
  .breadcrumbs {
    display: flex;
    margin-bottom: 1rem;
    color: #bdbdbd;
    font-size: .875rem;
    position: relative;
    top: -10px;
  }

  .separator {
    margin: 0 0.5rem;
  }

  .breadcrumbs a {
    color: #fff;
    text-decoration: underline dotted;
    transition: 0.4s opacity;
  }

  .breadcrumbs a:hover {
    opacity: 0.48;
  }
</style>