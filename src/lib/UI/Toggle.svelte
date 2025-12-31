<script>
  import { createBubbler } from 'svelte/legacy';

  const bubble = createBubbler();
  /**
   * @typedef {Object} Props
   * @property {boolean} [checked]
   * @property {any} [label]
   * @property {boolean} [disabled]
   * @property {any} id
   */

  /** @type {Props} */
  let {
    checked = $bindable(false),
    label = null,
    disabled = false,
    id
  } = $props();
</script>


<div class="wrapper">

  <div class="toggle">
    <input type="checkbox" {id} bind:checked={checked} {disabled} onchange={bubble('change')} />
    <label for={id}></label>
  </div>

  {#if label}
    <div class="label">
      {label}
    </div>
  {/if}

</div>


<style>
  .wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
    
  .toggle {
    display: block;
    height: 22px;
    width: 40px;
    margin-right: 8px;
  }

  .label {
    color: #000;
  }

  input:empty {
    margin-left: -9999px;
  }

  input:empty ~ label {
    position: relative;
    float: left;
    width: 150px;
    cursor: pointer;
    user-select: none;
  }

  input:empty ~ label:before, 
  input:empty ~ label:after {
    position: absolute;
    display: block;
    content: ' ';
    transition: all 250ms cubic-bezier(.4,0,.2,1);
  }

  input:empty ~ label:before {
    top: 3px;
    left: 0px;
    width: 36px;
    height: 14px;
    border-radius: 16px;
    background-color: #e0e0e0;
  }

  input:empty ~ label:after {
    top: 0px;
    left: -2px;
    background-color: #9e9e9e;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }

  input:checked ~ label:before {
    background-color: #e0e0e0;
  }

  input:checked ~ label:after {
    left: 18px;
    background-color: var(--color-secondary);
  }
  
  input:disabled ~ label {
    opacity: 0.3;
  }
</style>