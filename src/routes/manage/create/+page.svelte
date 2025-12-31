<script>
  import { fade } from 'svelte/transition';
  import { breadcrumbs } from '$lib/stores/breadcrumbs';

  let { data } = $props();
  $breadcrumbs = null;
</script>


<div class="container width-small margin-top-x-large" in:fade>

  <div class="sheet">

    <h2 class="margin-top-none black">Create</h2>
    
    <div class="links">
      <a href="/manage/user/create">
        <img src="/images/account-multiple-plus-outline.svg" alt="Create user" width="32" />
        User
      </a>
      <a href="/manage/client/create">
        <img src="/images/domain.svg" alt="Create client" width="32" />
        Client
      </a>
      <a href="/manage/project/create">
        <img src="/images/folder-plus-outline.svg" alt="Create project" width="32" />
        Project
      </a>
      <a href="/manage/course_template/create">
        <img src="/images/school-outline.svg" alt="Create course template" width="32" />
        Course template
      </a>
      <a href="/manage/checklist/create">
        <img src="/images/list-status.svg" alt="Create HSE document template" width="32" />
        HSE document template
      </a>
      <a href="/manage/exam/create">
        <img src="/images/clipboard-list-outline.svg" alt="Create exam" width="32" />
        Exam template
      </a>
      <a href="/manage/competency_assessment/create">
        <img src="/images/star-check-outline.svg" alt="Create competency template" width="32" />
        Competency template
      </a>
      <a href="/manage/practical_assessment/create">
        <img src="/images/wrench-check-outline.svg" alt="Create practical template" width="32" />
        Practical template
      </a>
      <a href="/manage/location/create">
        <img src="/images/map-marker-outline.svg" alt="Create training location" width="32" />
        Training location
      </a>
    </div>

  </div>

</div>


<style>
  .links img {
    margin-right: 16px;
  }
  
  .links a {
    background-color: #00968829;
    border-radius: .5rem;
    align-items: center;
    margin-bottom: .5rem;
    padding: 1rem;
    text-decoration: none;
    display: flex;
    transition: background-color .4s;
  }
  
  .links a:hover {
    opacity: 1;
    background: #0096887a;
  }
</style>