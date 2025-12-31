<script>
  import { browser } from '$app/environment';
  import { fade } from 'svelte/transition';
  import { materialFade } from '$lib/functions/transitions.js';

  let {
    options,
    show = $bindable(),
    selectedValue = $bindable(),
    style = null,
    change
  } = $props();

  let selectedOption = $state({ value: '' });
  let windowHeight = $state();
  let scrollY = $state();
  let height = 300;
  let wrapper = $state();
  let input = $state();
  let inputValue = $state('');

  if (selectedValue) {
    selectedOption = options.find((obj) => {
      return obj.id === selectedValue;
    });
  }

  $effect(() => {
    if (input && show) {
      input.focus();
    }
  });

  $effect(() => {
    if (browser) {
      if (show) {
        document.addEventListener('keydown', onArrowKeyPress);
        scrollToOption();
      } else {
        document.removeEventListener('keydown', onArrowKeyPress);
      }
    }
  });
  
  $effect(() => {
    if (inputValue) {
      const option = options.find(
        (o) =>
          o.label &&
          o.label[0] &&
          o.label[0].toLowerCase() === inputValue.toLowerCase()
      );
      const searchedElement = wrapper.querySelector(
        `[data-value*="${option.id}"]`
      );
      if (searchedElement) {
        const hoveredElement =
          wrapper.querySelectorAll('.hovered')[0] ||
          wrapper.querySelector('#selected');
        searchedElement.classList.add('hovered');
        hoveredElement.classList.remove('hovered');
        searchedElement.scrollIntoViewIfNeeded(false);
      }
    }
  });

  function scrollToOption() {
    setTimeout(() => {
      const selected = wrapper.querySelector('#selected');
      if (selected) {
        selected.scrollIntoView({ block: 'nearest', inline: 'start' });
      }
    }, 110);
  }

  function onArrowKeyPress(e) {
    let hoveredElement =
      wrapper.querySelectorAll('.hovered')[0] ||
      wrapper.querySelector('#selected');
    if (!hoveredElement) {
      return;
    }
    let newHoveredElement;
    if (e.keyCode === 38) {
      e.preventDefault();
      newHoveredElement = hoveredElement.previousElementSibling;
    }
    if (e.keyCode === 40) {
      e.preventDefault();
      newHoveredElement = hoveredElement.nextElementSibling;
    }
    if (e.keyCode === 13) {
      e.preventDefault();
      const newOption = hoveredElement.dataset.id;
      selectOption(newOption);
      return;
    }
    if (newHoveredElement) {
      newHoveredElement.classList.add('hovered');
      hoveredElement.classList.remove('hovered');
      newHoveredElement.scrollIntoViewIfNeeded(false);
    }
    input.focus()
  }

  function handleSearchInput(e) {
    if (e.target.id) {
      console.log(e.target.id[e.target.id.length - 1]);
      inputValue = '';
      inputValue = e.target.id[e.target.id.length - 1];
    } else {
      inputValue = '';
    }
  }

  function selectOption(e, value) {
    e.stopPropagation();
    show = false;
    let index = options.map((o) => o.id).indexOf(value);
    if (selectedValue) {
      selectedOption = options[index];
    }
    change(options[index]);
  }
</script>


<div bind:this={wrapper} class="wrapper">
  {#if show}
    <div class="dropdown-options" style="max-height: {height}px" in:materialFade out:fade={{ duration: 100 }}>
      {#each options as option}
        <div class="dropdown-option" id={option.id == selectedOption.id ? 'selected' : ''} class:selected={option.id == selectedOption.id} data-value={option.id} onclick={(e) => selectOption(e, option.id)}>
          {#if option.icon}
            <img src="/images/{option.icon}.svg" width="24" class="icon" alt={option.label} />
          {/if}
          {@html option.label}
        </div>
      {/each}
    </div>
    <input class="hidden-input" type="text" readonly={(style != "form")} bind:this={input} oninput={handleSearchInput} value={inputValue} />
  {/if}
</div>

<svelte:body onclick={() => (show = false)} />

<svelte:window bind:innerHeight={windowHeight} bind:scrollY />


<style>
  .wrapper {
    position: relative;
  }

  .dropdown-options {
    position: absolute;
    left: 0;
    top: 0;
    background: #fff;
    z-index: 200;
    min-width: 220px;
    border: solid 2px #d4d4de;
    border-radius: 0.5rem;
    padding: 8px 0;
    box-shadow: 0 4px 4px #01002414;
    overflow-y: auto;
  }

  .dropdown-option {
    display: flex;
    align-items: center;
    padding: 8px 24px 8px 16px;
    cursor: pointer;
    font-family: Roboto, sans-serif;
    font-size: 15px;
    font-weight: 400;
    transition: border-color 400ms ease, background-color 400ms ease;
  }

  .dropdown-option:hover {
    background-color: #52527a29;
  }
  
  :global(.hovered) {
    background-color: #52527a29;
  }

  .dropdown-option.selected {
    color: #272759;
    background-color: #52527a52;
  }
  
  .hidden-input {
    position: absolute;
    opacity: 0;
    width: 0;
    overflow: hidden;
  }

  img.icon {
    margin-right: 8px;
  }

  :global(span.fi) {
    margin-right: 0.5rem;
  }
</style>
