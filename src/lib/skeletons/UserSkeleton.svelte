<script>
  import config from "$lib/functions/config.js";
  const delay = duration => new Promise((res) => setTimeout(res, duration))
</script>


{#await delay(config.skeletons_delay) then _}
<div class="skeleton">
  <div class="circle pulsing"></div>
  <div class="info">
    <div class="line pulsing"></div>
    <div class="line pulsing"></div>
  </div>
</div>
{/await}


<style>
  .skeleton {
    display: flex;
    padding: 32px;
    justify-content: flex-start;
    align-items: center;
    border: solid 1px #e0e0e0;
    background-color: #fafafa;
  }
  
  .skeleton .circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 24px;
  }
  
  .skeleton .info {
    flex: 1;
  }
  
  .skeleton .line {
    height: 24px;
    width: 100%;
    margin-bottom: 4px;
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