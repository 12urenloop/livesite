<script lang="ts">
  import { Count } from "./Count";

  /** !! CHANGE BEFORE RUNNING CODE !! */
  const LOXSI_URL = "ws://localhost:8000/feed";

  let counts: Array<Count> = [];
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

  const socketMsgHandler: Record<string, SocketHandler> = {
    counts: (msg: SocketMsg) => {
      counts = msg.data;
      console.log(counts);
      counts.sort((c1, c2) => c2.count - c1.count);
      max_laps = counts.reduce((a, b) => (a.count > b.count ? a : b)).count;
    },
    message: (msg: SocketMsg) => {
      let notiElem = document.getElementById("notification-banner");
      if (!notiElem) return;
      notiElem.style.display = msg.data ? "block" : "none";
      if (msg.data) {
        let notiMsgElem = document.getElementById("notification-msg");
        if (!notiMsgElem) return;
        notiMsgElem.innerText = msg.data;
      }
    },
  };

  function parse_message(inp: string) {
    try {
      let socketMsg: SocketMsg = JSON.parse(inp);
      if (!socketMsgHandler[socketMsg.topic]) {
        return;
      }
      socketMsgHandler[socketMsg.topic](socketMsg);
    } catch (err) {
      console.error(
        `ERROR: could not parse websocket message\nMessage: ${inp}\nReason: ${err}`
      );
    }
  }

  // Test function
  // parse_message(`{ "topic": "counts", "data": [\
  //   { "count": 3, "team": { "id": 0, "name": "vtk" } },\
  //   { "count": 1, "team": { "id": 1, "name": "vtk" } },\
  //   { "count": 8, "team": { "id": 2, "name": "vtk" } },\
  //   { "count": 17, "team": { "id": 8, "name": "vtk" } },\
  //   { "count": 4, "team": { "id": 3, "name": "vtk" } },\
  //   { "count": 10, "team": { "id": 4, "name": "vtk" } },\
  //   { "count": 1, "team": { "id": 1, "name": "vtk" } },\
  //   { "count": 8, "team": { "id": 2, "name": "vtk" } },\
  //   { "count": 17, "team": { "id": 8, "name": "vtk" } },\
  //   { "count": 4, "team": { "id": 3, "name": "vtk" } },\
  //   { "count": 10, "team": { "id": 4, "name": "vtk" } },\
  //   { "count": 1, "team": { "id": 1, "name": "vtk" } },\
  //   { "count": 8, "team": { "id": 2, "name": "vtk" } },\
  //   { "count": 17, "team": { "id": 8, "name": "vtk" } },\
  //   { "count": 4, "team": { "id": 3, "name": "vtk" } },\
  //   { "count": 10, "team": { "id": 4, "name": "vtk" } },\
  //   { "count": 1, "team": { "id": 1, "name": "vtk" } },\
  //   { "count": 8, "team": { "id": 2, "name": "vtk" } },\
  //   { "count": 17, "team": { "id": 8, "name": "vtk" } },\
  //   { "count": 4, "team": { "id": 3, "name": "vtk" } },\
  //   { "count": 10, "team": { "id": 4, "name": "vtk" } },\
  //   { "count": 17, "team": { "id": 8, "name": "vtk" } }\
  // ]}`);
</script>

<style>
#notification-banner {
    display: none;
}
.progress-bar {
  text-align: left;
}
.progress-bar .text-dark {
  padding-left: 1vw;
}
</style>

<div class="w-100 p-4 pb-0">
  <div id="notification-banner">
    <div
      class="alert alert-warning d-flex align-items-center justify-content-center fs-3"
      role="alert"
    >
      <div id="notification-msg">An example danger alert with an icon</div>
    </div>
  </div>
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
      {#each counts as count, i}
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
                style="width: {Math.round((count.count / max_laps) * 100)}%;"
                aria-valuenow={count.count}
                aria-valuemin={0}
                aria-valuemax={max_laps}
              >
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
