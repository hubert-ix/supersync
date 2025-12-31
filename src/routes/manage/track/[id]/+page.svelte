<script>
  import Button from "$lib/UI/Button.svelte";
  import ProjectForm from '../ProjectForm.svelte';

  let { data } = $props();
</script>


<div class="edit-button">
  <Button caption="View project details" type="contained" style="yellow" icon="view" href={data.project.path} />
</div>

<ProjectForm project={data.project} />