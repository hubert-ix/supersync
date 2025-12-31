<script>
  import { fade } from 'svelte/transition';
  import Breadcrumbs from '$lib/structure/Breadcrumbs.svelte';
  import BackLink from '$lib/UI/BackLink.svelte';
  
  let {
    title = null,
    subtitle = null,
    overtitle = null,
    width = "huge",
    size = "regular",
    insideSection = false,
    imageUrl = null,
    displayBannerImage = true,
    style = null,
    includeFade = true,
    includeOverlay = false,
    parent = null,
    backLink = null,
    editLink = null,
    viewLink = null,
    children
  } = $props();
  
  const conditionalFade = (node, args) => includeFade ? fade(node, args) : {};
  
  let hasImage = $state(false);
  let backgroundImage = $state();
  
  $effect(() => {
    if (displayBannerImage && imageUrl) {
      backgroundImage = 'background-image: ';
      if (includeOverlay) {
        backgroundImage += 'linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),';
      }
      backgroundImage += 'url(' + imageUrl + '?tr=w-2000,ar-4-1)';
      hasImage = true;
    }
  });
</script>


<div class="banner {size} {style}" style="{backgroundImage}" class:inside-section={insideSection} class:with-image={hasImage} in:conditionalFade>
  <div class="container width-{width}">
    
    {#if backLink || editLink || viewLink}
      <div class="backlink">
        {#if backLink}
          <BackLink url={backLink} />
        {/if}
        {#if editLink}
          <BackLink url={editLink} icon="edit" />
        {/if}
        {#if viewLink}
          <BackLink url={viewLink} icon="view" />
        {/if}
      </div>
    {/if}

    <Breadcrumbs />

    {#if overtitle}
      <div class="overtitle">{overtitle}</div>
    {/if}
    
    {#if title}
      <h1>{@html title}</h1>
    {/if}
    
    {#if parent}
      <div class="parent">In <a href="{parent.path}">{parent.title}</a></div>
    {/if}
        
    {#if subtitle}
      <div class="subtitle">{subtitle}</div>
    {/if}
    
    {@render children?.()}
    
  </div>
</div>


<style>
  .banner {
    padding: 3rem 0 3rem 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }

  .banner.inside-section {
    padding: 0;
    border: none;
  }
  
  .banner.large {
    padding: 128px 0 80px;
    min-height: 320px;
  }
    
  .banner.no-background {
    background: none;
  }
  
  .banner.no-border {
    border: none;
  }

  .banner.people {
    background: #eceff1;
  }

  .overtitle {
    margin: 0 0 1.5rem;
    color: #9e9e9e;
  }
  
  h1 {
    margin: 0;
    color: #000;
  }
  
  .subtitle {
    color: #eee;
    max-width: 56rem;
    font-size: 1.5rem;
    margin-top: 0.5rem;
  }

  .with-image h1 {
    color: #fff;
  }
  
  .with-image .subtitle {
    color: #e0e0e0;
  }
  
  div.backlink {
    margin-bottom: 1.5rem;
    display: flex;
    grid-gap: 0.5rem;
  }

  .parent {
    margin-bottom: 2rem;
  }
</style>