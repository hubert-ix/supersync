<script>
  import { slide } from 'svelte/transition';
  import Button from '$lib/UI/Button.svelte';
  
  let { text } = $props();
  
  let showMore = $state(false);
  let paragraphs = [];
  let extraContent = $state("");
  
  // extracts the paragraphs from the html and put them in an array
  text.replace(/<p>(.*?)<\/p>/g, function () {
    paragraphs.push(arguments[0]);
  });
  
  if (paragraphs.length > 1) {
    for (let i in paragraphs) {
      if (i > 0) {
        extraContent += paragraphs[i];
      }
    }
  }
  
  let buttonText = $derived((showMore)?"Less...":"More...");
  
  function toggleText() {
    showMore = !showMore;
  }
</script>


{#if paragraphs.length > 1}
  {@html paragraphs[0]}
  {#if showMore}
    <div transition:slide>
      {@html extraContent}
    </div>
  {/if}
  <Button type="text" caption={buttonText} on:click={toggleText} />
{:else}
  {@html text}
{/if}