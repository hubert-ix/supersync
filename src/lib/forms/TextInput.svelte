<script>
  import { createBubbler } from 'svelte/legacy';
  import { textarea_resize } from '$lib/forms/autoresize_textarea.js'
  import Tick from "$lib/forms/Tick.svelte";

  const bubble = createBubbler();

  let {
    controlType = "",
    id = "",
    placeholder = "",
    value = $bindable(),
    disabled = false,
    type = "text",
    decimals = 0,
    classes = $bindable(""),
    autocomplete = null,
    name = null,
    enableAutoUpdate = false,
    finishedTyping = () => {} // only used with enableAutoUpdate
  } = $props();
  
  let step = (decimals > 0) ? 1 / Math.pow(10, decimals) : 0;
  classes += " " + type;

  function handleInput() {
    if (type == "number") {
      // if it's a number, make sure we can only enter the specified decimals
      // Allow: empty, minus sign, or valid number
      if (!value || value === '' || value === '-' || value === '.' || value === '-.') {
        return;
      }
      const regex = new RegExp(`^-?\\d*(?:\\.\\d{0,${decimals}})?$`);
      if (!regex.test(value)) {
        // Reject extra decimals by trimming
        const [intPart, decPart] = value.toString().split('.');
        if (decPart) {
          value = `${intPart}.${decPart.slice(0, decimals)}`;
        } 
        else {
          value = intPart;
        }
      }
    }
    finishedTyping();
  }
</script>


{#if controlType === "textarea"}
  <textarea rows="1" {id} {placeholder} {disabled} {name} class={classes} bind:value use:textarea_resize onkeyup={handleInput}></textarea>
{:else}
  {#if type === "password"}
    <input {id} {placeholder} {disabled} {name} class={classes} bind:value onkeyup={handleInput} type="password" />
  {:else if type ==="number"}
    <input {id} {placeholder} {disabled} {name} class={classes} {autocomplete} {step} bind:value onkeydown={bubble('keydown')} onclick={bubble('click')} onkeyup={handleInput} oninput={handleInput} type="number" />
  {:else if type ==="date"}
    <input {id} {placeholder} {disabled} {name} class={classes} {autocomplete} max="2999-12-25" step="1" bind:value onkeydown={bubble('keydown')} onclick={bubble('click')} onkeyup={handleInput} oninput={handleInput} type="date" />
  {:else if type ==="time"}
    <input {id} {placeholder} {disabled} {name} class={classes} {autocomplete} bind:value onkeydown={bubble('keydown')} onclick={bubble('click')} onkeyup={handleInput} oninput={handleInput} type="time" />
  {:else}
    <input {id} {placeholder} {disabled} {name} class={classes} {autocomplete} bind:value onkeydown={bubble('keydown')} onclick={bubble('click')} onkeyup={handleInput} oninput={bubble('input')} type="text" />
  {/if}
{/if}

{#if finishedTyping && enableAutoUpdate}
  <Tick />
{/if}


<style>
  input, textarea {
    display: block;
    width: 100%;
    padding: 1rem;
    border: 2px solid var(--color-borders);
    border-radius: .5rem;
    background-color: #fff;
    color: #555;
    font-family: neue-haas-unica, sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    transition: border 0.3s;
    resize: none;
  }

  input.small {
    padding: 0.5rem;
  }

  textarea {
    padding: 20px;
    min-height: 100px;
  }

  textarea.small {
    min-height: 66px;
  }

  textarea.comment {
    background-color: #fff;
  }
  
  textarea.message {
    border-radius: 8px;
    border-top-right-radius: 0px;
  }

  input.bare, textarea.bare {
    border: none; 
    padding: 0;
    background: none;
    outline: none;
    font-family: Roboto,sans-serif;
    color: #757575;
    font-size: 15px;
    line-height: 26px;
    letter-spacing: 1px;
    margin: 0px;
    resize: none;
  }
  
  input.headline {
    font-family: Roboto,sans-serif;
    color: #212121;
    font-size: 20px;
    line-height: 28px;
    font-weight: 500;
    letter-spacing: 1px;
    margin: 0px;
  }
  
  input.link {
    font-family: 'Roboto Mono', sans-serif; 
    color: var(--color-secondary); 
    font-size: 14px; 
    line-height: 20px; 
    font-weight: 700; 
    letter-spacing: 1px; 
    text-transform: uppercase;
  }
  
  input.number {
    max-width: 120px;
  }
  
  input::placeholder, textarea::placeholder {
    color: #bdbdbd;
  }

  input:disabled, textarea:disabled {
    border-color: #d4d4de;
    color: #9e9e9e;
  }

  input:focus, textarea:focus {
    border-color: #66c0b8; 
    outline: none;
  }
  
  .dropdown {
    padding: 8px 0;
    margin: 0;
    border: 1px solid #ccc;
    overflow: auto;
    width: 100%;
    max-width: 300px;
    background: #fff;
    box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.16);
    position: absolute;
    z-index: 100;
  }
  
  .dropdown .item {
    display: flex;
    align-items: center;
    padding: 8px 24px 8px 16px;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
    transition: border-color 400ms ease, background-color 400ms ease;
    cursor: pointer;
  }
  
  .dropdown .item:hover {
    border-top: 1px solid #f8bbd0;
    border-bottom: 1px solid #f8bbd0;
    background-color: #fef6f9;
  }
  
  .avatar {
    margin-right: 16px;
  }
  
  .mentions {
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    top: 23px;
    left: 20px;
    margin-top: -12px;
  }
  
  @media only screen and (max-width: 767px) {
    input {
      padding: 14px 12px;
    }
    
    textarea {
      padding: 20px 12px;
    }
    
    .mentions {
      left: 12px;
    }
  }
</style>