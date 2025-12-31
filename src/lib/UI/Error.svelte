<script>
  import Modal from '$lib/UI/Modal.svelte';
  
  let { message } = $props();
</script>


<Modal title="an error occured" on:close>
  <p>{message}</p>
</Modal>