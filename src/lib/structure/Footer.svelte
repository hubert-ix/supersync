<script>
	let { segment } = $props();
</script>


<footer>
	<div class="container">
		<div class="footer-left">
			© Copyright Offshore Energy UK Limited
		</div>
		<div class="footer-right">
			<a href="/legal/privacy">Privacy policy</a>
			<a href="/legal/terms">Terms of use</a>
		</div>
	</div>
</footer>


<style>
	footer {
		position: relative;
		width: 100%;
		background-color: #272759;
		background-image: url(/images/bg-dot.png);
    background-position: 0 0;
    background-repeat: repeat;
    background-size: auto;
		color: #fff;
		padding: 2rem 0;
	}

	footer .container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		grid-gap: 1rem;
	}

	footer a {
		color: #fff;
	}

	.footer-left {
		font-size: .875rem;
	}

	.footer-right {
		display: flex;
		grid-column-gap: 1rem;
    grid-row-gap: 1rem;
	}

	@media screen and (max-width: 767px) {
		footer .container {
			flex-direction: column;
			align-items: start;
		}
	}
</style>