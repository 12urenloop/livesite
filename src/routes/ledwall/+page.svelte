<script lang="ts">
  import { onMount } from "svelte";
  import { counts } from "$lib/stores/counts";
  import { background } from "$lib/stores/bodyStyle";
  import { startWebsocket } from "$lib/websocket";
  import LedWallCard from "$lib/components/LedWallCard.svelte";

  onMount(() => {
    startWebsocket();
    background.set("black");
  });
</script>

<div class="relative h-screen overflow-auto">
  <div class="flex flex-wrap justify-center text-white gap-4 pt-2">
    {#each $counts as count}
      <LedWallCard info={count} />
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
</div>

<style>
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
