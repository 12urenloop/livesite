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
        const images = document.getElementsByClassName('img-container');
        for (let i = 0; i < images.length; i++) {
          images[i].style.height = '70px';
        }
        if (!notiMsgElem) return;
        notiMsgElem.innerText = msg.data;
      } else {
        const images = document.getElementsByClassName('img-container');
        for (let i = 0; i < images.length; i++) {
          images[i].style.height = 'unset';
        }
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
  parse_message(`{"topic": "counts", "data": [{"count": 12, "team": {"id": 1, "name": "HILOK"}}, {"count": 305, "team": {"id": 2, "name": "VTK"}}, {"count": 300, "team": {"id": 3, "name": "VLK"}}, {"count": 0, "team": {"id": 4, "name": "VGK"}}, {"count": 0, "team": {"id": 5, "name": "VEK - Moeder Lies"}}, {"count": 0, "team": {"id": 6, "name": "Wetenschappen - VLAK - VETO"}}, {"count": 0, "team": {"id": 7, "name": "Hermes - GFK"}}, {"count": 0, "team": {"id": 8, "name": "Politeia"}}, {"count": 0, "team": {"id": 9, "name": "HK"}}, {"count": 0, "team": {"id": 10, "name": "VRG"}}, {"count": 0, "team": {"id": 11, "name": "VPPK"}}, {"count": 0, "team": {"id": 12, "name": "Blandinia"}}, {"count": 0, "team": {"id": 13, "name": "SK"}}, {"count": 0, "team": {"id": 14, "name": "Lombrosiana - VBK"}}, {"count": 0, "team": {"id": 15, "name": "LILA"}}, {"count": 0, "team": {"id": 16, "name": "Antilopen"}}, {"count": 0, "team": {"id": 17, "name": "HILOK Roze"}}]}`);
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

{#if (new URLSearchParams(window.location.search)).get('b')}
  <div class="w-100 pb-0" style="height: 100vh; background-color: black">
    <div id="notification-banner">
      <div
        class="alert alert-warning d-flex align-items-center justify-content-center fs-3"
        role="alert"
      >
        <div id="notification-msg">An example danger alert with an icon</div>
      </div>
    </div>
    
    <div style="color: white; gap: 16px; padding-top: 8px;" class="d-flex flex-wrap flex-row justify-content-center">
      {#each counts as count, i}
        <div class="d-flex align-items-center flex-column flex-nowrap"  style="background-color: #202020; position:relative; width: 20em; border-radius: 20px">
          <div style="font-size: 1.69rem; position: absolute; right: 0; border-bottom: 3px solid grey; border-radius:0 0 0 20px; border-left: 3px solid grey; padding: 10px">{i + 1}</div>
          <div style="max-width: 75%; text-align:center; font-size: 30px;">{count.team.name}</div>
          <div style="max-width: 95%; margin-top:auto" class="d-flex flex-row flex-nowrap justify-content-around">
            {#each count.team.name.split("-") as team_name}
              <img
                src="/images/teams/{team_name.trim().toLowerCase()}.png"
                alt="logo"
                style="max-height: 100px;"
                class="img-container"
              />
            {/each}
          </div>
          <div class="align-self-start" style="margin-top:10px; background-color: orange; min-width: {count.count === 0 ? 1 : Math.round((count.count / max_laps) * 100)}%; min-height: 10px;"></div>
          <div style="width: 100%; font-size: 30px; text-align: center; margin-bottom: 5px">{count.count}</div>
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
  {:else}
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
                  style="width: {count.count === 0 ? 0 : Math.round((count.count / max_laps) * 100)}%;"
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
{/if}


<!-- No Sponsors for now -->
<!--<footer><img src="https://zinc.zeus.gent/zeus" alt="Sponsor"></footer>-->
