<script>
  let { text, href } = $props();
</script>

<h3>
  <a {href}>
    <img src="/images/back-arrow-black.png" width="16" alt="Back" />
  </a>
  {text}
</h3>


<style>
  h3 {
    display: flex;
    align-items: center;
    margin: 0 0 3rem 0;
  }

  a {
    display: flex;
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 1rem;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #e0e0e0;
    transition: background-color 400ms ease;
  }

  a:hover {
    background-color: #9e9e9e;
    opacity: 1;
  }

  a svg {
    width: 1.5rem;
    height: 1.5rem;
  }
</style>