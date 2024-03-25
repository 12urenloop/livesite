<script lang="ts">
  import { dev } from "$app/environment";
  import {
    counts,
    max_laps,
    startWebsocket,
    parse_message,
  } from "$lib/stores/counts";
  import { onMount } from "svelte";

  onMount(() => {
    startWebsocket();
    if (dev) {
      parse_message(
        `{"topic": "counts", "data": [{"count": 12, "team": {"id": 1, "name": "HILOK"}}, {"count": 305, "team": {"id": 2, "name": "VTK"}}, {"count": 300, "team": {"id": 3, "name": "VLK"}}, {"count": 0, "team": {"id": 4, "name": "VGK"}}, {"count": 0, "team": {"id": 5, "name": "VEK - Moeder Lies"}}, {"count": 0, "team": {"id": 6, "name": "Wetenschappen - VLAK - VETO"}}, {"count": 0, "team": {"id": 7, "name": "Hermes - GFK"}}, {"count": 0, "team": {"id": 8, "name": "Politeia"}}, {"count": 0, "team": {"id": 9, "name": "HK"}}, {"count": 0, "team": {"id": 10, "name": "VRG"}}, {"count": 0, "team": {"id": 11, "name": "VPPK"}}, {"count": 0, "team": {"id": 12, "name": "Blandinia"}}, {"count": 0, "team": {"id": 13, "name": "SK"}}, {"count": 0, "team": {"id": 14, "name": "Lombrosiana - VBK"}}, {"count": 0, "team": {"id": 15, "name": "LILA"}}, {"count": 0, "team": {"id": 16, "name": "Antilopen"}}, {"count": 0, "team": {"id": 17, "name": "HILOK Roze"}}]}`,
      );
    }
  });
</script>

<div class="p-4">
  <table class="table">
    <thead>
      <tr>
        <th>#</th>
        <th />
        <th>Team</th>
        <th>Rounds</th>
      </tr>
    </thead>
    <tbody>
      {#each $counts as count, i}
        {@const perc = Math.round((count.count / $max_laps) * 100)}
        <tr>
          <th>{i + 1}</th>
          <td>
            {#each count.team.name.split("-") as team_name}
              <img
                src="/images/teams/{team_name.trim().toLowerCase()}.png"
                alt="logo"
                style="height: 30px; margin-right: 10px"
              />
            {/each}
          </td>
          <td>{count.team.name}</td>
          <td class="w-[75%] text-gray-600 text-left">
            <div class="relative">
              <div class="progress h-5 w-full" />
              <div
                class="absolute top-0 left-0 bg-warning overflow-visible h-5 progress text-dark text-right transition-all"
                style={"width: " + perc + "%"}
              >
                <span class="px-2 font-bold">
                  {count.count}
                </span>
              </div>
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <a class="btn" href="/ledwall"> LED screen mode </a>
</div>
