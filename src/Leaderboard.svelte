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
	const STANDINGS_URL = "ws://172.12.50.37:8000/feed";

	const standings: Standings = [];
	/** Amount of columns in the standing tables */
	// let num_cols: number;
	/** Amount of (used) rows in the standings table */
	// let num_rows: number;
	/** Font size of each cell in the standings table */
	let font_size: number;

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
			// Clear standings array
			standings.length = 0;
			const data = <Count>JSON.parse(inp);

			for (const count of data) {
				const laps = count.count;
				const team_name = count.team.name;

				standings.push({ team_name, laps });
			}

			// Sort by descending laps
			standings.sort((a, b) => b.laps - a.laps);

			// Create grid of at most 2n x n = 2n^2 blocks
			// If there are not enough standings to create a perfect rectangle
			// the rectangle will simply be filled up as far as possible, however
			// it must still be known how many columns are needed, hence the Math.ceil
			// num_cols = Math.ceil(Math.sqrt(standings.length / 2));

			// Filling a 2n x n table with m elements will use at most
			// ceil(m / n) rows
			// eg. 5 cells would require a 4x2 table but only actually use 3 rows
			// (ceil(5 / 2) = 3)
			// num_rows = Math.ceil(standings.length / num_cols);

			// Scale font size dynamically based on amount of columns, clamping it to between
			// 1 and 5 rem
			font_size = Math.max(1.25, Math.min((40/standings.length)*0.5, 3));
			// font_size = 3;

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

<!-- <table>
	<thead>
		<tr><th><h1>HUIDIGE RANGSCHIKKING</h1></th></tr>
	</thead>

	<tbody>
		{#each Array(num_rows) as _, i}
			<tr>
				{#each Array(num_cols) as _, j}
					{@const idx = i * num_cols + j}
					{#if idx < standings.length}
						<TeamBlock
							position={(idx + 1).toString()}
							logo={`images/6ul.jpg`}
							name={standings[idx].team_name}
							laps={standings[idx].laps.toString()}
							font_size={font_size}
						/>
					{/if}
				{/each}
			</tr>
		{/each}
	</tbody>

	<tfoot>
		<tr>
			<td><img src="https://zinc.zeus.gent/zeus" alt="Sponsor"></td>
		</tr>
	</tfoot>
</table> -->

<h1>HUIDIGE RANGSCHIKKING</h1>

<div class="standings">
	{#each standings as standing, i}
		<TeamBlock
			position={(i+1).toString()}
			logo={`images/6ul.jpg`}
			name={standing.team_name}
			laps={standing.laps.toString()}
			font_size={font_size}
		/>
	{/each}
</div>

<footer><img src="https://zinc.zeus.gent/zeus" alt="Sponsor"></footer>

<style lang="scss">
	@import "./lib/colors";

	@mixin adaptive_hover_bg($color) {
		background-color: $color;

		&:hover {
			background-color: darken($color, 2%);
		}
	}

	h1 {
		width: 100%;
		text-align: center;
		padding: 0;
		margin: 0.75rem 0 0 0;
		overflow-wrap: break-word;

		color: $zeus;
		font-size: max(3vw, 2.5rem);
		font-weight: 500;
	}

	.standings {
		margin-top: 1.5rem;
		margin-bottom: 1.5rem;
		width: 100%;
		height: 70vh;

		display: flex;
		flex-flow: column wrap;
		justify-content: flex-start;
		align-items: center;
	}

	footer {
		width: 100%;
		margin-top: auto;
		background-color: $background-dark;

		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;

		img {
			padding: 0;
			margin: 0;

			width: 4rem;
			height: 4rem;
		}
	}

	// table {
	// 	width: 100%;
	// 	height: 100vh;
	// 	text-align: center;
	// 	border-collapse: collapse;
	// 	table-layout: fixed;

	// 	display: flex;
	// 	flex-flow: column nowrap;
	// 	justify-content: flex-start;
	// 	align-items: center;

	// 	thead {
	// 		flex: 0 1 auto;
	// 		display: flex;
	// 		flex-flow: row nowrap;
	// 		justify-content: center;
	// 		align-items: center;

	// 		h1 {
	// 			padding: 0;
	// 			margin: 0.75rem 0 1.5rem 0;
	// 			overflow-wrap: break-word;

	// 			color: $zeus;
	// 			font-size: max(3vw, 2.5rem);
	// 			font-weight: 500;
	// 		}
	// 	}

	// 	tbody {
	// 		min-width: 75vw;
	// 		margin: 0.2rem 0.2rem 1.5rem 0.2rem;
	// 		flex: 0 1 auto;

	// 		tr {
	// 			display: flex;
	// 			flex-flow: row wrap;
	// 			justify-content: center;
	// 		}
	// 	}

	// 	tfoot {
	// 		flex: 0 1 auto;
	// 		width: 100%;
	// 		margin-top: auto;
	// 		background-color: $background-dark;

	// 		tr {
	// 			display: flex;
	// 			flex-flow: row wrap;
	// 			justify-content: center;
	// 			align-items: center;

	// 			td {
	// 				display: flex;
	// 				flex-flow: row nowrap;
	// 				justify-content: center;
	// 				align-items: center;
	// 			}
	// 		}

	// 		img {
	// 			padding: 0;
	// 			margin: 0;

	// 			width: 4rem;
	// 			height: 4rem;
	// 		}
	// 	}
	// }
</style>
