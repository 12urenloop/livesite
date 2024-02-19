<script lang="ts">
  import { notification } from "$lib/stores/counts";
</script>

<div class="w-100 p-4 pb-0">
  {#if $notification !== ""}
    <div id="notification-banner">
      <div
        class="alert alert-warning d-flex align-items-center justify-content-center fs-3"
        role="alert"
      >
        <div id="notification-msg">{$notification}</div>
      </div>
    </div>
  {/if}
  <slot />
</div>

<style>
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :root {
    font-size: 16px;
  }

  :global(html),
  :global(body) {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  :global(body) {
    position: absolute;

    font-family: sans-serif;
    font-size: 16px;
    letter-spacing: 0.5px;
  }
</style>
