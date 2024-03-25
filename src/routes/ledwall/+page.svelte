<script lang="ts">
  import {counts, max_laps} from "$lib/stores/counts";
</script>

<div class="z-[2] relative h-screen overflow-auto">
    <div class="flex flex-wrap justify-center text-white gap-4 pt-2">
        {#each $counts as count}
            <div
                    class="flex items-center flex-col relative w-80 rounded-2xl bg-zinc-800"
            >
                <div
                        class="rounded-bl-2xl text-2xl absolute right-0 border-l-2 border-b-2 border-zinc-200 p-4"
                >
                    {count.rank + 1}
                </div>
                <div class="max-w-56 text-center text-4xl">
                    {count.team.name}
                </div>
                <div class="flex justify-around max-w-72 mt-auto">
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
                        class="self-start mt-4 bg-warning"
                        style="min-width: {count.count === 0
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
</div>
<div class="w-screen h-screen z-[1] absolute top-0 left-0 bg-black"/>

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
