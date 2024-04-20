<script lang="ts">
  import { positions } from "$lib/stores/counts";
  import { onDestroy } from "svelte";

  export let teamId: number;
  export let offset: number;

  $: position = $positions[teamId];
  $: progress = position?.progress ?? 0;

  const moveProgress = setInterval(() => {
    progress = Math.min(progress + (6 ?? position?.speed ?? 0), 100);
  }, 1000);

  onDestroy(() => {
    clearInterval(moveProgress);
  });
</script>

<div
  class="absolute top-0 left-0 bg-gray-400 overflow-visible h-5 progress transition-all rounded-l-none"
  style={`width: 10%; left: ${offset}%`}
/>
<div
  class="absolute top-0 left-0 bg-[#2c2ca0] overflow-visible h-5 progress transition-all ease-linear duration-1000 rounded-l-none"
  style={`width: ${(progress ?? 0) / 10}%; left: ${offset}%`}
/>
