<script>
  import config from "$lib/functions/config.js";

  const delay = duration => new Promise((res) => setTimeout(res, duration))

  let { noDelay = false, withCircle = false } = $props();
  let duration = (noDelay)?0:config.skeletons_delay;
</script>


{#await delay(duration) then _}
  <div class="skeleton pulsing"></div>
{/await}


<style>
  .skeleton {
    display: flex;
    background-color: #5c57ff14;
	  border-radius: 0.5rem;
	  margin-bottom: 0.25rem;
    min-height: 3.5rem;
  }

  .pulsing {
    position: relative; 
    background-color: #eee; 
    overflow: hidden; 
    z-index: 1;
  }
  
  .pulsing::after { 
    display: block; 
    content: ""; 
    position: absolute; 
    width: 100%; 
    height: 100%; 
    transform: translateX(-100%); 
    background-image: -webkit-gradient(linear, left top, right top, from(transparent), color-stop(rgba(255, 255, 255, 0.5)), to(transparent)); 
    background-image: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0)); 
    animation: loading 0.8s infinite; 
    z-index: 0;
  } 
 
  @keyframes loading { 
    100% { 
      transform: translateX(100%); 
    } 
  } 
</style>