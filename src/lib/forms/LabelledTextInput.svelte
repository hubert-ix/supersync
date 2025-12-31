<script>
  import TextInput from "./TextInput.svelte";

  let {
    value = $bindable(),
    label = "",
    id = ""
  } = $props();
</script>


<div class="wrap">
  <div class="label">
    {label}
  </div>
  <div class="input">
    <TextInput {id} bind:value={value} />
  </div>
</div>


<style>
  .wrap {
    display: flex;
    grid-gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .label {
    border: solid 2px #d4d4de;
    color: #000;
    background-color: #e9e9ee;
    border-radius: .5rem;
    padding: .875rem 1rem;
    display: flex;
    align-items: center;
    min-width: 215px;
  }

  .input {
    flex: 1;
  }
</style>