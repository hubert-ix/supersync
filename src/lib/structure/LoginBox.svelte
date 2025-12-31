<script>
  let { title, children } = $props();
</script>


<div class="outer">
<div class="container wrap width-medium">

  <div class="header">
    <h3 class="black margin-top-none">
      Super login
    </h3>
  </div>

  {@render children?.()}

</div>
</div>


<style>
  .wrap {
    background-color: #fffc;
    border-radius: 0.5rem;
    padding: 4rem 3rem;
    box-shadow: 0 2px 8px #00000029;
    margin-top: 60px;
  }

  .header {
    border-bottom: 2px solid #52527a29;
    padding-bottom: 1rem;
    margin-bottom: 2rem;
  }

  @media screen and (max-width: 767px) {
    .wrap {
      padding: 2rem 1rem;
    }

    .outer {
      padding: 0 1rem;
    }
  }
</style>