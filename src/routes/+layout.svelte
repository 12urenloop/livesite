<script lang="ts">
  import { background } from "$lib/stores/bodyStyle";
  import { notification } from "$lib/stores/counts";
  import "../app.pcss";
</script>

<div
  class="prose !max-w-full !w-screen min-h-screen h-full"
  style={`background-color: ${$background}`}
>
  {#if $notification !== ""}
    <div class="p-2">
      <div role="alert" class="alert alert-warning flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          /></svg
        >
        <span>{$notification}</span>
      </div>
    </div>
  {/if}
  <slot />
</div>
