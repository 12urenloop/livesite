<script lang="ts">
  import { max_laps, positions } from "$lib/stores/counts";
  import type { Count } from "$lib/types";
  import { onDestroy } from "svelte";

  export let info: Count;

  $: position = $positions[info.team.id];
  $: progress = position?.progress ?? 0;

  const moveProgress = setInterval(() => {
    progress = Math.min(progress + (6 ?? position?.speed ?? 0), 100);
  }, 1000);

  onDestroy(() => {
    clearInterval(moveProgress);
  });
</script>

<div class="relative w-80 h-80 rounded-2xl bg-zinc-800 overflow-hidden">
  <div
    class="absolute bottom-0 w-full transition-all ease-linear duration-1000 bg-[#2c2ca0]"
    style={`height:${progress ?? 0}%`}
  ></div>
  <div class="absolute top-0 left-0 w-full flex items-center flex-col">
    <div
      class="rounded-bl-2xl text-2xl absolute right-0 border-l-2 border-b-2 border-zinc-200 p-4"
    >
      {info.rank}
    </div>
    <div class="max-w-56 text-center text-4xl">
      {info.team.name}
    </div>
    <div class="flex justify-around max-w-72 mt-auto">
      {#each info.team.name.split("-") as team_name}
        <img
          src="/images/teams/{team_name.trim().toLowerCase()}.png"
          alt="logo"
          style="max-height: 100px;"
          class="img-container"
        />
      {/each}
    </div>
    <div
      class="self-start mt-4 bg-warning"
      style="min-width: {info.count === 0
        ? 1
        : Math.round((info.count / $max_laps) * 100)}%; min-height: 10px;"
    ></div>
    <div
      style="width: 100%; font-size: 30px; text-align: center; margin-bottom: 5px"
    >
      {info.count}
    </div>
  </div>
</div>
