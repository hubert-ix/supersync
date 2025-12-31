<script>
  import { scale } from 'svelte/transition';
  import UserAvatar from "$lib/structure/UserAvatar.svelte";
  import Ripple from "$lib/UI/Ripple.svelte";
  
  let {
    text = $bindable(),
    selectable = false,
    removable = false,
    optionId = 0,
    user = null,
    selected = $bindable(false),
    style = "",
    whenSelected,
    whenRemoved = () => {}
  } = $props();

  let doRemove = false;
  let rippleTrigger = $state(false);
  let blocked = $state(false);
  
  if (user && user.status == "blocked") {
    text += " (blocked)";
    blocked = true;
  }
  
  function select() {
    if (selectable && !selected) {
      selected = true;
      whenSelected(optionId)
    }
  }
  
  function remove(e) {
    e.preventDefault();
    e.stopPropagation();
    selected = false;
    whenRemoved(optionId)
  }
  
  function rippleEnded() {
    if (doRemove) {
      selected = false;
      whenRemoved(optionId)
      rippleTrigger = false;
      doRemove = false;
    }
  }
</script>


<div class="chip {style}" onclick={select} class:selected class:selectable class:blocked>
  {#if selectable}
    <Ripple {rippleEnded} {rippleTrigger} />
  {/if}
  {#if selected}
    <div class="chip-check" in:scale>
      <img src="/images/check.svg" alt="Check" width="16" />
    </div>
  {/if}
  {#if user && user.display_name}
    <div class="avatar">
      <UserAvatar {user} size="tiniest" />
    </div>
  {/if}
  <div class="chip-text">{@html text}</div>
  {#if selected || removable}
    <button class="chip-remove" onclick={remove}>
      <img src="/images/close.svg" width="16" alt="remove" in:scale />
    </button>
  {/if}
</div>


<style>
  .chip {
    position: relative;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    height: 2.5rem;
    min-width: 3rem;
    padding: .75rem 1rem;
    background-color: #009688;
    color: #fff;
    border-radius: 2.5rem;
    margin-right: 0.5rem;
  }

  .chip.small {
    height: auto;
    border: none;
    height: auto;
    margin: 0;
    padding: 4px 0.75rem;
    background: #d4d4d4;
    border-radius: 4px;
    color: #222;
  }

  .chip.autocomplete {
    padding-right: 0.5rem;
  }
  
  .chip.mention {
    color: #424242;
    background-color: #e0e0e0;
    height: 24px;
    padding: 0 8px;
    margin-top: 12px;
    margin-bottom: 0;
    color: #757575;
    font-size: 15px;
    line-height: 26px;
    position: relative;
    top: -2px;
    box-shadow: none;
  }

  .chip.purple {
    background-color: #272759;
  }

  .chip.blue {
    background-color: #337ba3;
  }
  
  .chip.blocked {
    opacity: 0.3;
  }
  
  .chip.selectable {
    cursor: pointer;
  }
  
  .chip.selected {
    cursor: default;
    padding: 0;
    padding-left: 0.3rem;
    padding-right: 0.5rem;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
  }
  
  .chip-check {
    width: 2rem;
    height: 2rem;
    margin-right: .5rem;
    border-radius: 50%;
    background-color: #669cba;
    text-align: center;
  }
  
  .chip-remove {
    border: none;
    padding: 0;
    margin-right: 4px;
    min-width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: #ccdee8;
    outline: none;
    position: relative;
    left: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 200ms ease, opacity 200ms ease;
  }
  
  .chip-remove:focus {
    outline: none;
  }
  
  .chip-remove:hover {
    background-color: #99d5cf;
    opacity: 1;
  }
  
  .avatar {
    margin-right: 8px;
    margin-left: -12px;
  }
</style>