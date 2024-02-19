<script lang="ts">
  import { counts, max_laps, startWebsocket } from "$lib/stores/counts";
  import { onMount } from "svelte";

  // parse_message(
  //   `{"topic": "counts", "data": [{"count": 12, "team": {"id": 1, "name": "HILOK"}}, {"count": 305, "team": {"id": 2, "name": "VTK"}}, {"count": 300, "team": {"id": 3, "name": "VLK"}}, {"count": 0, "team": {"id": 4, "name": "VGK"}}, {"count": 0, "team": {"id": 5, "name": "VEK - Moeder Lies"}}, {"count": 0, "team": {"id": 6, "name": "Wetenschappen - VLAK - VETO"}}, {"count": 0, "team": {"id": 7, "name": "Hermes - GFK"}}, {"count": 0, "team": {"id": 8, "name": "Politeia"}}, {"count": 0, "team": {"id": 9, "name": "HK"}}, {"count": 0, "team": {"id": 10, "name": "VRG"}}, {"count": 0, "team": {"id": 11, "name": "VPPK"}}, {"count": 0, "team": {"id": 12, "name": "Blandinia"}}, {"count": 0, "team": {"id": 13, "name": "SK"}}, {"count": 0, "team": {"id": 14, "name": "Lombrosiana - VBK"}}, {"count": 0, "team": {"id": 15, "name": "LILA"}}, {"count": 0, "team": {"id": 16, "name": "Antilopen"}}, {"count": 0, "team": {"id": 17, "name": "HILOK Roze"}}]}`,
  // );

  onMount(() => {
    startWebsocket();
  });
</script>

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
        <td class="w-75 text-dark">
          <div class="progress" style="height: 30px">
            <div
              class="progress-bar bg-warning progress-bar-striped progress-bar-animated"
              role="progressbar"
              style="width: {count.count === 0
                ? 0
                : Math.round((count.count / $max_laps) * 100)}%;"
              aria-valuenow={count.count}
              aria-valuemin={0}
              aria-valuemax={$max_laps}
            >
              <div class="text-dark"><b>{count.count}</b></div>
            </div>
          </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
<a href="/ledwall"
  ><button type="button" class="btn btn-secondary">LED screen mode</button></a
>

<style lang="scss">
  .progress-bar {
    text-align: left;
  }
  .progress-bar .text-dark {
    padding-left: 1vw;
  }

  :global(body) {
    background-color: #f0f0f0;
    color: #0e0e0e;

    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
  }
</style>
