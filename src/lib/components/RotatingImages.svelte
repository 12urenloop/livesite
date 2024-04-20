<script lang="ts">
  import { onDestroy } from "svelte";

  export let teamName: string;

  $: teamNames = teamName.split("-");

  let showingIdx = 0;
  let rotInterval = setInterval(() => {
    showingIdx = (showingIdx + 1) % teamNames.length;
  }, 1000);

  onDestroy(() => {
    clearInterval(rotInterval);
  });
</script>

<img
  src={`/images/teams/${teamNames[showingIdx].trim().toLowerCase()}.png`}
  alt="logo"
  class="max-w-8 max-h-8"
/>
