<script>
  import Tick from "$lib/forms/Tick.svelte";

  let {
    name = "",
    value = $bindable(),
    options,
    inline = false,
    disabled = false,
    enableAutoUpdate = false,
    style = "",
    change = () => {}
  } = $props();

  let valueChanged = $state(false);

  function changed() {
    valueChanged = true;
    change();
  }
</script>


<div class:inline class:disabled class={style}>
  {#each options as option (option.id)}
    <div class="item">
      <input type="radio" {name} value={option.id} bind:group={value} id="radio-{name}-{option.id}" {disabled} onchange={changed} /> 
      <label for="radio-{name}-{option.id}">
        {option.label}
        {#if option.description}
          <div class="description">{option.description}</div>
        {/if}
      </label>
    </div>
  {/each}
</div>

{#if valueChanged && enableAutoUpdate}
  <Tick />
{/if}


<style>
  .inline {
    display: flex;
  }
  
  .item {
    margin-bottom: 0.75rem;
  }
  
  .inline .item {
    margin: 0 1rem 0 0;
  }
  
  .description {
    color: #bdbdbd;
    position: relative;
    top: -4px;
    font-size: 15px;
  }

  .columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
  }
  
  [type="radio"]:not(:checked),
  [type="radio"]:checked {
    position: absolute;
    left: -9999px;
    opacity: 0;
  }

  [type="radio"]:not(:checked)+label,
  [type="radio"]:checked+label {
    position: relative;
    padding-left: 2.2rem;
    margin: 0;
    cursor: pointer;
    display: inline-block;
    transition: .28s ease;
    user-select: none;
    font-size: 1rem;
    color: #757575;
  }

  .inline [type="radio"]:not(:checked)+label,
  .inline [type="radio"]:checked+label {
    color: #757575;
  }

  [type="radio"]+label:before,
  [type="radio"]+label:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0px;
    margin: 0;
    width: 24px;
    height: 24px;
    background: #fff;
    transition: .28s ease;
  }

  [type="radio"]:not(:checked)+label:before,
  [type="radio"]:not(:checked)+label:after,
  [type="radio"]:checked+label:before,
  [type="radio"]:checked+label:after {
    border-radius: 50%;
  }

  [type="radio"]:not(:checked)+label:before,
  [type="radio"]:not(:checked)+label:after {
    border: 2px solid #009688;
  }

  [type="radio"]:not(:checked)+label:after {
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  [type="radio"]:checked+label:before {
    border: 2px solid transparent;
  }

  [type="radio"]:checked+label:before,
  [type="radio"]:checked+label:after {
    border: 2px solid #009688;
  }

  [type="radio"]:checked+label:after {
    background-color: #009688;
    -webkit-transform: scale(0.6);
    transform: scale(0.6);
  }

  [type="radio"]:disabled:checked+label:before {
    border: 2px solid rgba(0, 0, 0, 0.26);
  }

  [type="radio"]:disabled:checked+label:after {
    background-color: rgba(0, 0, 0, 0.26);
  }

  [type="radio"]:disabled:not(:checked)+label:before {
    background-color: transparent;
    border-color: rgba(0, 0, 0, 0.26);
  }

  [type="radio"]:disabled+label {
    color: rgba(0, 0, 0, 0.26);
  }

  [type="radio"]:disabled:not(:checked)+label:before {
    border-color: rgba(0, 0, 0, 0.26);
  }

  [type="radio"]:disabled:checked+label:after {
    background-color: rgba(0, 0, 0, 0.26);
    border-color: #BDBDBD;
  }
</style>