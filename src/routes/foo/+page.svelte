<script>
	export let data;
</script>
<h2>pdf<form method="POST">
	<label>
		the page:
		<input name="page" value={data.page} />
	</label>
</form><img src={data.png} class=inscreen alt="Page 99 of my PDF file" /></h2>
