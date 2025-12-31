<script>
  let {
    index,
    checked = $bindable(false),
    label = null,
    disabled = false,
    changed = () => {}
  } = $props();
  
  function change(e) {
    changed(index, checked);
  }
</script>


<div class="wrapper">
  <label for="checkbox-{index}">
    <input type="checkbox" id="checkbox-{index}" bind:checked={checked} on:change={change} {disabled} /> 
  </label>
  {#if label}
    <div class="label">
      {@html label}
    </div>
  {/if}
</div>


<style>
  .wrapper {
    display: flex;
  }

  label {
    /*
    display: block;
    max-width: 100%;
    margin: 0 auto;
    flex: 1;*/
  }

  input {
    -webkit-appearance: none;
    appearance: none;
    vertical-align: middle;
    background: #fff;
    border-radius: 0.125em;
    display: inline-block;
    border: 2px solid var(--color-borders);
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
    background: var(--color-borders);
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

  .label {
    margin-left: 0.5rem;
  }
</style>