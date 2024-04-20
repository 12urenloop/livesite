<script lang="ts">
  import { dev } from "$app/environment";
  import GrowingBar from "$lib/components/GrowingBar.svelte";
  import RotatingImages from "$lib/components/RotatingImages.svelte";
  import { background } from "$lib/stores/bodyStyle";
  import { counts, max_laps } from "$lib/stores/counts";
  import { startWebsocket, parse_message } from "$lib/websocket";
  import { onMount } from "svelte";
  import { flip } from "svelte/animate";

  onMount(() => {
    startWebsocket();

    background.set("white");

    if (dev) {
      parse_message(
        `{"topic": "counts",
         "data": [
         {"count": 12, "team": {"id": 1, "name": "HILOK"}},
         {"count": 305, "team": {"id": 2, "name": "VTK"}},
         {"count": 305, "team": {"id": 3, "name": "VLK"}},
         {"count": 12, "team": {"id": 4, "name": "VGK"}},
         {"count": 0, "team": {"id": 5, "name": "VEK - Moeder Lies"}},
         {"count": 0, "team": {"id": 6, "name": "Wetenschappen - VLAK - VETO"}},
         {"count": 0, "team": {"id": 7, "name": "Hermes - GFK"}},
         {"count": 0, "team": {"id": 8, "name": "Politeia"}},
         {"count": 10, "team": {"id": 9, "name": "HK"}},
         {"count": 10, "team": {"id": 10, "name": "VRG"}},
         {"count": 5, "team": {"id": 11, "name": "VPPK"}},
         {"count": 0, "team": {"id": 12, "name": "Blandinia"}},
         {"count": 0, "team": {"id": 13, "name": "SK"}},
         {"count": 0, "team": {"id": 14, "name": "Lombrosiana - VBK"}},
         {"count": 0, "team": {"id": 15, "name": "LILA"}},
         {"count": 0, "team": {"id": 16, "name": "Antilopen"}},
         {"count": 0, "team": {"id": 17, "name": "HILOK Roze"}}]}`,
      );
    }
  });
</script>

<div class="p-4 container mx-auto">
  <h2 class="text-center my-0">Scoreboard - Gentse 12urenloop</h2>
  <table class="table">
    <thead>
      <tr>
        <th>#</th>
        <th />
        <th>Team</th>
        <th class="w-[75%]">Rounds</th>
      </tr>
    </thead>
    <tbody>
      {#each $counts as count (count.team.id)}
        {@const perc = Math.round((count.count / $max_laps) * 100)}
        <tr animate:flip>
          <th>{count.rank}</th>
          <td class="not-prose flex w-[inherit]">
            <div class="sm:flex hidden gap-2">
              {#each count.team.name.split("-") as team_name}
                <img
                  src="/images/teams/{team_name.trim().toLowerCase()}.png"
                  alt="logo"
                  class="w-8"
                />
              {/each}
            </div>
            <div class="sm:hidden flex justify-center w-full">
              <RotatingImages teamName={count.team.name} />
            </div>
          </td>
          <td>{count.team.name}</td>
          <td class="w-full text-gray-600 text-left flex">
            <div class="relative w-full">
              <div class="progress h-5 w-full" />
              <div
                class="absolute top-0 left-0 bg-[#ffcc00] overflow-visible h-5 progress text-dark text-right transition-all rounded-r-none"
                style={"width: " + perc * 0.9 + "%"}
              >
                <span class="px-2 font-bold">
                  {count.count}
                </span>
              </div>
              <GrowingBar teamId={count.team.id} offset={perc * 0.9} />
            </div>
            <div class="w-[10%]"></div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <a class="btn" href="/ledwall"> LED screen mode </a>
</div>

<style>
  td {
    padding: 0.5rem;
  }
</style>
