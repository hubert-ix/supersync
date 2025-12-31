<script>
	import { page } from '$app/stores';
  import Banner from "$lib/structure/Banner.svelte";
  
	const dev = process.env.NODE_ENV === 'development';

	let title = $state("");
	switch($page.status) {
		case 404: 
			title = "Oops, this page does not seem to exist";
			break;
		case 403: 
			title = "You don't have access to this page";
			break;
	}
</script>


<Banner title={title} backLink="/" />

<div class="container width-huge">
	<div class="sheet width-xlarge">

		{$page.status} - {$page.error.message}

		{#if dev && $page.error.stack}
			<pre>{$page.error.stack}</pre>
		{/if}

	</div>
</div>