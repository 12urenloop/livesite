<script lang="ts">
	import Leaderboard from "./Leaderboard.svelte";
</script>

<Leaderboard/>

<style lang="scss">
	@import "./lib/colors";

	:global(body) {
		background-color: $background;
		color: $foreground;

		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		align-items: center;
	}
</style>
