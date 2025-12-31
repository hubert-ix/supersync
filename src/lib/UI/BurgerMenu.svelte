<script>
  import { stopPropagation } from 'svelte/legacy';

  let { toggleNav } = $props();
  let opened = $state(false);
  
  function toggle() {
    opened = !opened;
    toggleNav();
  }
  
  function close() {
    if (opened) {
      opened = false;
    }
  }
</script>


<div class="mobile-menu" class:opened onclick={stopPropagation(toggle)}>
  <div class="burger-menu">
    <div class="line-top"></div>
    <div class="line-middle"></div>
    <div class="line-bottom"></div>
  </div>
</div>

<svelte:body onclick={close} />


<style>
  .mobile-menu {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .mobile-menu:hover {
    opacity: 0.7;
    transition: opacity 0.2s;
  }
  
  .burger-menu {
    width: 28px;
    height: 32px;
    min-width: 24px;
    margin-right: 1.5rem;
  }
  
  .line-top {
    height: 2px;
    margin-top: 6px;
    margin-bottom: 6px;
    background-color: #000;
    transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;
    transition: transform 0.5s;
  }
  
  .line-middle {
    height: 2px;
    margin-top: 6px;
    margin-bottom: 6px;
    background-color: #000;
    opacity: 1;
    transition: opacity 0.5s;
  }
  
  .line-bottom {
    height: 2px;
    margin-top: 6px;
    margin-bottom: 6px;
    background-color: #000;
    transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;
    transition: transform 0.5s;
  }
  
  .opened .line-top {
    transform: translate3d(0px, 8px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(45deg) skew(0deg, 0deg); transform-style: preserve-3d;
  }
  
  .opened .line-middle {
    opacity: 0;
  }
  
  .opened .line-bottom {
    transform: translate3d(0px, -8px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(-45deg) skew(0deg, 0deg); transform-style: preserve-3d;
  }
</style>