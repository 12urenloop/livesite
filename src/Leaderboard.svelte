<script lang="ts">
    import {Count} from "./Count";

    /** !! CHANGE BEFORE RUNNING CODE !! */
    const LOXSI_URL = "ws://localhost:8000/feed";

    let counts: [Count] = [];
    let max_laps: number = 0;

    const socket = new WebSocket(LOXSI_URL);
    socket.onerror = (err) => {
        console.error(`WEBSOCKET ERROR:\n${err}`);
    };
    socket.onclose = (ev) => {
        console.error(`WEBSOCKET CLOSED:\n${ev}`);
    };
    socket.onmessage = (ev) => {
        parse_message(ev.data);
    };

    function parse_message(inp: string) {
        try {
            counts = <[Count]>JSON.parse(inp);
            counts.sort((c1, c2) => c2.count - c1.count)
            max_laps = counts.reduce((a, b) => a.count > b.count ? a : b).count;
        } catch (err) {
            console.error(`ERROR: could not parse websocket message\nMessage: ${inp}\nReason: ${err}`)
        }
    }

    // Test function
    // 	parse_message(`[\
    // { "count": 3, "team": { "id": 0, "name": "vtk" } },\
    // { "count": 1, "team": { "id": 1, "name": "vtk" } },\
    // { "count": 8, "team": { "id": 2, "name": "vtk" } },\
    // { "count": 17, "team": { "id": 8, "name": "vtk" } },\
    // { "count": 4, "team": { "id": 3, "name": "vtk" } },\
    // { "count": 10, "team": { "id": 4, "name": "vtk" } },\
    // { "count": 1, "team": { "id": 1, "name": "vtk" } },\
    // { "count": 8, "team": { "id": 2, "name": "vtk" } },\
    // { "count": 17, "team": { "id": 8, "name": "vtk" } },\
    // { "count": 4, "team": { "id": 3, "name": "vtk" } },\
    // { "count": 10, "team": { "id": 4, "name": "vtk" } },\
    // { "count": 1, "team": { "id": 1, "name": "vtk" } },\
    // { "count": 8, "team": { "id": 2, "name": "vtk" } },\
    // { "count": 17, "team": { "id": 8, "name": "vtk" } },\
    // { "count": 4, "team": { "id": 3, "name": "vtk" } },\
    // { "count": 10, "team": { "id": 4, "name": "vtk" } },\
    // { "count": 1, "team": { "id": 1, "name": "vtk" } },\
    // { "count": 8, "team": { "id": 2, "name": "vtk" } },\
    // { "count": 17, "team": { "id": 8, "name": "vtk" } },\
    // { "count": 4, "team": { "id": 3, "name": "vtk" } },\
    // { "count": 10, "team": { "id": 4, "name": "vtk" } },\
    // { "count": 17, "team": { "id": 8, "name": "vtk" } }\
    // ]`);
</script>

<div class="w-100 p-4">
    <table class="table">
        <thead>
        <tr>
            <th>#</th>
            <th></th>
            <th>Team</th>
            <th>Rounds</th>
        </tr>
        </thead>
        <tbody>
        {#each counts as count, i}
            <tr>
                <th>{i + 1}</th>
                <td><img src="/images/{count.team.name.toLowerCase()}.png" style="height: 30px"></td>
                <td>{count.team.name}</td>
                <td class="w-75 text-dark">
                    <div class="progress" style="height: 30px">
                        <div class="progress-bar bg-warning progress-bar-striped progress-bar-animated"
                             role="progressbar"
                             style="width: {Math.round(count.count/max_laps*100)}%" aria-valuenow="{count.count}"
                             aria-valuemin="0"
                             aria-valuemax="{max_laps}">
                            <div class="text-dark"><b>{count.count}</b></div>
                        </div>
                    </div>
                </td>
            </tr>
        {/each}
        </tbody>

    </table>
</div>

<!-- No Sponsors for now -->
<!--<footer><img src="https://zinc.zeus.gent/zeus" alt="Sponsor"></footer>-->
