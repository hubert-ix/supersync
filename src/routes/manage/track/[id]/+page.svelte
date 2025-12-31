<script>
  import Button from "$lib/UI/Button.svelte";
  import TrackForm from "../../../TrackForm.svelte";

  let { data } = $props();
</script>


<div class="edit-button">
  <Button caption="View project details" type="contained" style="yellow" icon="view" href={data.project.path} />
</div>

<TrackForm track={data.track} />
