<script lang="ts">
  import { counts, max_laps } from "$lib/stores/counts";
</script>

<div
  style="color: white; gap: 16px; padding-top: 8px;"
  class="d-flex flex-wrap flex-row justify-content-center"
>
  {#each $counts as count, i}
    <div
      class="d-flex align-items-center flex-column flex-nowrap"
      style="background-color: #202020; position:relative; width: 20em; border-radius: 20px"
    >
      <div
        style="font-size: 1.69rem; position: absolute; right: 0; border-bottom: 3px solid grey; border-radius:0 0 0 20px; border-left: 3px solid grey; padding: 10px"
      >
        {i + 1}
      </div>
      <div style="max-width: 75%; text-align:center; font-size: 30px;">
        {count.team.name}
      </div>
      <div
        style="max-width: 95%; margin-top:auto"
        class="d-flex flex-row flex-nowrap justify-content-around"
      >
        {#each count.team.name.split("-") as team_name}
          <img
            src="/images/teams/{team_name.trim().toLowerCase()}.png"
            alt="logo"
            style="max-height: 100px;"
            class="img-container"
          />
        {/each}
      </div>
      <div
        class="align-self-start"
        style="margin-top:10px; background-color: orange; min-width: {count.count ===
        0
          ? 1
          : Math.round((count.count / $max_laps) * 100)}%; min-height: 10px;"
      ></div>
      <div
        style="width: 100%; font-size: 30px; text-align: center; margin-bottom: 5px"
      >
        {count.count}
      </div>
    </div>
  {/each}
</div>
<img
  loading="lazy"
  width="200"
  height="200"
  src="https://zinc.zeus.gent/zeus"
  class="zeus"
  alt="Zeus WPI"
  data-recalc-dims="1"
/>
<img
  loading="lazy"
  width="200"
  height="200"
  src="https://12urenloop.be/images/logo.svg"
  class="urenloop"
  alt="12urenloop"
  data-recalc-dims="1"
/>

<style>
  :global(body) {
    background-color: black;
  }

  .zeus {
    float: right;
    margin-top: -11em;
    margin-right: 2em;
  }
  .urenloop {
    float: left;
    margin-top: -11em;
    margin-left: 2em;
  }
</style>
