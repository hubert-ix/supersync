<script>  
  let { segment, logout, currentUser } = $props();
      
  function slideRight(node, { delay = 0, duration = 200 }) {
    return {
      delay,
      duration,
      css: t => 
        `opacity: ${Math.min(t * 20, 1)};` +
        `left: ${320 * t - 320}px;`
    };
  }
</script>


<nav id="nav" transition:slideRight>
  
  <div class="section">
    {#if currentUser.type == "administrator" || currentUser.type == "project-administrator"}
      <a href="/">Home</a>
      <a href="/clients" class:selected={segment == "clients"}>Clients</a>
      <a href="/projects" class:selected={segment == "projects"}>Projects</a>
      <a href="/courses" class:selected={segment == "courses"}>Courses</a>
      <a href="/participants" class:selected={segment == "participants"}>Participants</a>
    {:else if currentUser.type == "team-member"}
      <a href="/">Home</a>
      <a href="/projects" class:selected={segment == "projects"}>Projects</a>
    {:else if currentUser.type == "participant"}
      <a href="/">Your projects</a>
    {/if}
    {#if !currentUser.loggedIn}
      <a href="/login">Sign in</a>
    {/if}
  </div>
  
  {#if currentUser.loggedIn}
    <div class="section">
      {#if currentUser.type == "administrator" || currentUser.type == "project-administrator"}
        <a class:selected='{segment === "manage"}' href='/manage/create'>Create</a>
        <a class:selected='{segment === "admin"}' href='/admin'>Admin</a>
      {/if}
      <a class:selected='{segment === "account"}' href='/account'>Your account</a>
      <a onclick={logout}>Logout</a>    
    </div>
  {/if}
  
</nav>


<style>
  nav {
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 8;
    width: 320px;
    height: 100vh;
    padding: 88px 0 63px;
    border-right: 1px solid #424242;
    background-color: #272759;
    transition: left 0.5s;
    overflow-y: auto;
  }
  
  nav a {
    color: #e9e9ee;
    background-color: #e9e9ee29;
    border-radius: .5rem;
    align-items: center;
    margin-bottom: 0.5rem;
    padding: 1rem;
    text-decoration: none;
    transition: background-color .4s;
    display: flex;
  }
  
  nav a:hover {
    background-color: rgba(233, 30, 99, 0.08);
    opacity: 1;
  }
  
  nav img {
    margin-right: 16px;
  }
  
  .section {
    padding: 2rem;
    border-bottom: 2px solid #52527a52;
  }
</style>