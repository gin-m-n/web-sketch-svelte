<script>
	const template = 'abcdefg';
	let pointer = $state(0);
	let rendered = $derived(template.slice(0, pointer));
	const trigger = () => {
		setTimeout(() => {
			pointer++;
			if (pointer < template.length - 1) trigger();
		}, 100);
	};
</script>

<div class="container">
	<div>bow page</div>
	<button onclick={() => trigger()}>plus pointer</button>
	<text>{rendered}</text>
</div>

<style>
	.container {
		width: 300px;
		display: flex;
		flex-direction: column;
	}
</style>
