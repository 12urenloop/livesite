<script lang="ts">
	import TeamBlock from "./TeamBlock.svelte";

	type Count = {
		count: number,
		team: {
			id: number,
			name: string,
		}
	}[];
	type Standings = {
		team_name: string,
		laps: number,
	}[];

	/** !! CHANGE BEFORE RUNNING CODE !! */
	const STANDINGS_URL = "ws://l.o.x.s.i/feed";

	const standings: Standings = [];

	const standings_socket = new WebSocket(STANDINGS_URL);
	standings_socket.onerror = (err) => {
		console.error(`WEBSOCKET ERROR:\n${err}`);
	};
	standings_socket.onclose = (ev) => {
		console.error(`WEBSOCKET CLOSED:\n${ev}`);
	};
	standings_socket.onmessage = (ev) => {
		parse_message(ev.data);
	};

	function parse_message(inp: string) {
		try {
			const data = <Count>JSON.parse(inp);

			for (const count of data) {
				const laps = count.count;
				const team_name = count.team.name;

				standings.push({ team_name, laps });
			}

			// Sort by descending laps
			standings.sort((a, b) => b.laps - a.laps);

			if (standings.length > 40) { console.warn("WARNING: listing more than 40 teams, this might not fit on the screen"); }
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
// { "count": 12, "team": { "id": 5, "name": "vtk" } },\
// { "count": 15, "team": { "id": 6, "name": "vtk" } },\
// { "count": 3, "team": { "id": 7, "name": "vtk" } },\
// { "count": 12, "team": { "id": 5, "name": "vtk" } },\
// { "count": 15, "team": { "id": 6, "name": "vtk" } },\
// { "count": 3, "team": { "id": 7, "name": "vtk" } },\
// { "count": 17, "team": { "id": 8, "name": "vtk" } },\
// { "count": 1, "team": { "id": 1, "name": "vtk" } },\
// { "count": 8, "team": { "id": 2, "name": "vtk" } },\
// { "count": 17, "team": { "id": 8, "name": "vtk" } },\
// { "count": 17, "team": { "id": 8, "name": "vtk" } }\
// ]`);
</script>

<h1>HUIDIGE RANGSCHIKKING</h1>

<!-- Tables -->
<div class="wrapper">
	<div class="container">
		{#each standings as standing, i}
			<TeamBlock
				position={(i+1).toString()}
				logo={`images/teams/${standing.team_name}.png`}
				name={standing.team_name}
				laps={standing.laps.toString()}
				cell_count={standings.length}
			/>
		{/each}
	</div>
</div>

<style lang="scss">
	@import "./lib/colors";

	@mixin adaptive_hover_bg($color) {
		background-color: $color;

		&:hover {
			background-color: darken($color, 2%);
		}
	}
	h1 {
		padding: 0;
		margin: 0.75rem 0 1.5rem 0;

		color: $zeus;
		font-size: max(3vw, 2rem);
		font-weight: 400;
	}
	.wrapper {
		width: auto;
		height: auto;
		margin: 2rem;

		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
	}

	.container {
		width: auto;
		height: auto;
		display: flex;
		flex-flow: row wrap;
	}
</style>
