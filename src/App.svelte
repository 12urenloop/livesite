<script lang="ts">
	import Leaderboard from "./Leaderboard.svelte";
  window.addEventListener('message', (evt) => {
      if (evt.data !== 'activate-ledwall') return;
      document.body.style['background-color'] = '#ffffff00';
  })
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
