<script lang="ts">
	import TeamRow from "./TeamRow.svelte";

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

	const STANDINGS_URL = "ws://l.o.x.s.i/feed";
	/** Sorted list of teams, split into chunks of 10 */
	const chunks: Standings[] = [];

	const standings_socket = new WebSocket(STANDINGS_URL);
	standings_socket.onerror = (err) => {
		console.error(`WEBSOCKET ERROR:\n${err}`);
	};
	standings_socket.onclose = (ev) => {
		console.error(`WEBSOCKET CLOSED:\n${ev}`);
	};
	standings_socket.onmessage = (ev) => {
		try {
			const data = <Count>JSON.parse(ev.data);
			const standings: Standings = [];

			for (const count of data) {
				const laps = count.count;
				const team_name = count.team.name;

				standings.push({ team_name, laps });
			}

			standings.sort((a, b) => b.laps - a.laps);
			console.log(standings);

			if (standings.length > 40) { console.warn("WARNING: listing more than 40 teams, this might not fit on the screen"); }

			// Split into chunks of 10 (fits better on screen like this);
			chunks.length = 0;
			for (let i=0; i<standings.length; i+=10) {
				const chunk = standings.slice(i, i+10);
				chunks.push(chunk);
			}

			console.log(chunks);
		} catch (err) {
			console.error(`ERROR: could not parse websocket message\nMessage: ${ev.data}\nReason: ${err}`)
		}
	};

	function test(inp: string) {
		try {
			const data = <Count>JSON.parse(inp);
			const standings: Standings = [];

			for (const count of data) {
				const laps = count.count;
				const team_name = count.team.name;

				standings.push({ team_name, laps });
			}

			// Sort by descending laps
			standings.sort((a, b) => b.laps - a.laps);

			if (standings.length > 40) { console.warn("WARNING: listing more than 40 teams, this might not fit on the screen"); }

			// Split into chunks of 10 (fits better on screen like this);
			chunks.length = 0;
			for (let i=0; i<standings.length; i+=10) {
				const chunk = standings.slice(i, i+10);
				chunks.push(chunk);
			}

			console.log(chunks);
		} catch (err) {
			console.error(`ERROR: could not parse websocket message\nMessage: ${inp}\nReason: ${err}`)
		}
	}

	test(`[\
{ "count": 3, "team": { "id": 0, "name": "VTK mens 1" } },\
{ "count": 1, "team": { "id": 1, "name": "VTK mens 2" } },\
{ "count": 8, "team": { "id": 2, "name": "VTK mens 3" } },\
{ "count": 4, "team": { "id": 3, "name": "VTK mens 4" } },\
{ "count": 10, "team": { "id": 4, "name": "VTK mens 5" } },\
{ "count": 12, "team": { "id": 5, "name": "VTK mens 6" } },\
{ "count": 15, "team": { "id": 6, "name": "VTK mens 7" } },\
{ "count": 3, "team": { "id": 7, "name": "VTK mens 8" } },\
{ "count": 17, "team": { "id": 8, "name": "VTK mens 9" } },\
{ "count": 17, "team": { "id": 8, "name": "VTK mens 9" } },\
{ "count": 3, "team": { "id": 0, "name": "VTK mens 1" } },\
{ "count": 1, "team": { "id": 1, "name": "VTK mens 2" } },\
{ "count": 8, "team": { "id": 2, "name": "VTK mens 3" } },\
{ "count": 4, "team": { "id": 3, "name": "VTK mens 4" } },\
{ "count": 10, "team": { "id": 4, "name": "VTK mens 5" } },\
{ "count": 12, "team": { "id": 5, "name": "VTK mens 6" } },\
{ "count": 15, "team": { "id": 6, "name": "VTK mens 7" } },\
{ "count": 3, "team": { "id": 7, "name": "VTK mens 8" } },\
{ "count": 17, "team": { "id": 8, "name": "VTK mens 9" } },\
{ "count": 17, "team": { "id": 8, "name": "VTK mens 9" } }\
]`);
</script>

<table>
	<!-- Header -->
	<thead>
		<tr>
			<th><h1>HUIDIGE RANGSCHIKKING</h1></th>
		</tr>
	</thead>

	<!-- Tables -->
	{#each chunks as chunk, i}
		<tbody>
		{#each chunk as team, j}
			<TeamRow
				position={(i*10+j+1).toString()}
				logo="images/vtk.png"
				name={team.team_name}
				laps={team.laps.toString()}
			/>
		{/each}
		</tbody>
	{/each}
</table>

<style lang="scss">
	@import "./lib/colors";

	table {
		text-align: center;
		border-collapse: collapse;
		table-layout: fixed;

		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: flex-start;

		thead {
			flex: 0 0 100%;
			display: flex;
			flex-flow: row nowrap;
			justify-content: center;
			align-items: center;

			h1 {
				padding: 0;
				margin: 0.75rem 0 1.5rem 0;

				color: $zeus;
				font-size: max(3vw, 2rem);
				font-weight: 400;
			}
		}

		tbody {
			border-top: 0.2rem solid $zeus;
			border-right: 0.2rem solid $zeus;
			border-bottom: 0.2rem solid $zeus;

			// 4 columns
			// Add left border only for last element to preven double borders
			&:nth-child(2) {
				border-left: 0.2rem solid $zeus;
			}

			// 3 columns
			@media screen and (max-width: 1260px) {
				// 3rd element (4th because of thead) needs right border
				&:nth-child(4) {
					border-right: 0.2rem solid $zeus;
				}

				// Remove top border for 4th element to prevent double borders
				&:nth-child(5) {
					border-top: none;
					border-left: 0.2rem solid $zeus;
				}
			}

			// 2 columns
			@media screen and (max-width: 890px) {
				&:nth-child(3) {
					border-right: 0.2rem solid $zeus;
				}

				// Remove top border from 3rd and 4th element to prevent double borders
				&:nth-child(4) {
					border-top: none;
					border-left: 0.2rem solid $zeus;
				}
				// Remove left border to undo previous media query
				&:nth-child(5) {
					border-top: none;
					border-left: none;
				}
			}

			// 1 column
			@media screen and (max-width: 595px) {
				// First element needs right border
				&:nth-child(2) {
					border-right: 0.2rem solid $zeus;
				}
				&:nth-child(3) {
					border-left: 0.2rem solid $zeus;
				}

				// Remove borders between elements
				&:not(:nth-child(2)) {
					border-top: none;
				}

				&:not(:last-child) {
					border-bottom: none;
				}

				// Last element needs left border
				&:last-child {
					border-left: 0.2rem solid $zeus;
				}
			}
		}
	}
</style>
