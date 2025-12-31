<script>
  import config from "$lib/functions/config.js";
  const delay = duration => new Promise((res) => setTimeout(res, duration))
</script>


{#await delay(config.skeletons_delay) then _}
  <div class="skeleton pulsing"></div>
{/await}


<style>
  .skeleton {
    background-color: #00968829;
    border-radius: .5rem;
    flex-flow: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: .5rem;
    display: flex;
    min-height: 100px;
  }
  
  .pulsing {
    position: relative; 
    background-color: #00968829;  
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