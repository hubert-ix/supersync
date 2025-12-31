<script>
  import TextInput from "$lib/forms/TextInput.svelte";

  let {
    id,
    includeName = true,
    name = $bindable(""),
    line1 = $bindable(""),
    line2 = $bindable(""),
    line3 = $bindable(""),
    city = $bindable(""),
    region = $bindable(""),
    postcode = $bindable(""),
  } = $props();
</script>


<div class="wrap">
  {#if includeName}
  <div class="item">
    <TextInput id="{id}_name" bind:value={name} placeholder="Name..." />
  </div>
  {/if}
  <div class="item">
    <TextInput id="{id}_line1" bind:value={line1} placeholder="Address line 1..." />
  </div>
  <div class="item">
    <TextInput id="{id}_line2" bind:value={line2} placeholder="Address line 2..." />
  </div>
  <div class="item">
    <TextInput id="{id}_line3" bind:value={line3} placeholder="Address line 3..." />
  </div>
  <div class="item">
    <TextInput id="{id}_city" bind:value={city} placeholder="Town or city..." />
  </div>
  <div class="item">
    <TextInput id="{id}_region" bind:value={region} placeholder="Region/county..." />
  </div>
  <div class="item">
    <TextInput id="{id}_postcode" bind:value={postcode} placeholder="Postcode..." />
  </div>
</div>


<style>
  .item {
    margin-bottom: 0.5rem;
  }
</style>