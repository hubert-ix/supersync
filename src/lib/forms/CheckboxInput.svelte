<script>
  import Tick from "$lib/forms/Tick.svelte";

  let {
    enableAutoUpdate = false,
    name = "",
    value = $bindable(),
    disabled = false,
    options,
    change = () => {}
  } = $props();

  let valueChanged = $state(false);

  function changed() {
    valueChanged = true;
    setTimeout(() => {valueChanged = false}, 3000);
    change();
  }
</script>


{#each options as option}
  <div class="item {option.style}">
    <label for="checkbox-{name}{option.id}">
      <input type="checkbox" {name} value={option.id} bind:group={value} id="checkbox-{name}{option.id}" {disabled} onchange={changed} /> 
    </label>
    <div class="label">
      {option.label}
    </div>
  </div>
{/each}

{#if valueChanged && enableAutoUpdate}
  <Tick />
{/if}


<style>
  .item {
    margin-bottom: 0.5rem;
    display: flex;
    /*align-items: center;*/
  }

  .label {
    margin-left: 0.5rem;
    flex: 1;
  }

  .green .label {
    color: #60b760;
  }

  label {
    display: block;
    max-width: 100%;
    margin: 0 auto;
  }

  input {
    -webkit-appearance: none;
    appearance: none;
    vertical-align: middle;
    background: #fff;
    border-radius: 0.125em;
    display: inline-block;
    border: 2px solid #009688;
    width: 24px;
    height: 24px;
    position: relative;
    cursor: pointer;
    outline: 0;
  }

  input:before,
  input:after {
    content: "";
    position: absolute;
    background: #009688;
    width: calc(3px * 3);
    height: 3px;
    top: 50%;
    left: 10%;
    transform-origin: left center;
  }

  input:before {
    transform: rotate(45deg) translate(calc(3px / -2), calc(3px / -2)) scaleX(0);
    transition: transform 100ms ease-in 100ms;
  }

  input:after {
    width: calc(3px * 5);
    transform: rotate(-45deg) translateY(calc(3px * 2)) scaleX(0);
    transform-origin: left center;
    transition: transform 100ms ease-in;
  }

  input:checked:before {
    transform: rotate(45deg) translate(calc(3px / -2), calc(3px / -2)) scaleX(1);
    transition: transform 100ms ease-in;
  }

  input:checked:after {
    width: calc(3px * 5);
    transform: rotate(-45deg) translateY(calc(3px * 2)) scaleX(1);
    transition: transform 100ms ease-out 100ms;
  }

  input:focus {
    outline: 0;
  }

  input:disabled {
    filter: grayscale(100%);
    opacity: 0.2;
  }
</style>