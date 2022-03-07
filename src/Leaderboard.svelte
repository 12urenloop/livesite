<script lang="ts">
	import { onDestroy } from "svelte";

	import { DoubleBounce } from "svelte-loading-spinners";

	import TeamRow from "./TeamRow.svelte";

	type Standings = string[];

	const _STANDINGS_STUB: Standings = ["2", "5", "18", "1", "9", "20", "19", "6", "3", "4", "7", "14", "16", "15", "8", "10", "11", "12", "13", "17"];
	const STANDINGS_URL = "http://0.0.0.0/standings";

	async function get_standings(): Promise<Standings> {
		try {
			const res = await fetch(STANDINGS_URL, { redirect: "follow", mode: "no-cors" });

			if (!(res.ok)) {
				console.error(`ERROR: could not get config from ${STANDINGS_URL}\n${res.status}\n${res.body}\nUsing stub data...`);
				return _STANDINGS_STUB;
				// return Promise.reject(`Could not get config from ${STANDINGS_URL}\n${res.status}\n${res.body}`);
			}

			return res.json();
		} catch (err) {
			console.error(`ERROR: could not get config from ${STANDINGS_URL}\n${err}\nUsing stub data...`);
			return _STANDINGS_STUB;
			// return Promise.reject(`could not get config from ${STANDINGS_URL}\n${err}`);
		}
	}

	let standings_promise = get_standings();

	const interval = setInterval(get_standings, 1000);
	onDestroy(() => clearInterval(interval));
</script>

{#await standings_promise}
	<DoubleBounce size="3" unit="em" color="#FF7F00" duration="1.5s"/>
{:then}
	<table>
		<thead>
			<tr>
				<th><h1>HUIDIGE RANGSCHIKKING</h1></th>
			</tr>
		</thead>
		<tbody>
			<TeamRow position="1" logo="images/vtk.png" name="VTK Menskes" laps=15 />
			<TeamRow position="2" logo="images/vtk.png" name="VTK Menskes" laps=15 />
			<TeamRow position="3" logo="images/vtk.png" name="VTK Menskes" laps=15 />
			<TeamRow position="4" logo="images/vtk.png" name="VTK Menskes" laps=15 />
			<TeamRow position="5" logo="images/vtk.png" name="VTK Menskes" laps=15 />
			<TeamRow position="6" logo="images/vtk.png" name="VTK Menskes" laps=15 />
			<TeamRow position="7" logo="images/vtk.png" name="VTK Menskes" laps=15 />
			<TeamRow position="8" logo="images/vtk.png" name="VTK Menskes" laps=15 />
			<TeamRow position="9" logo="images/vtk.png" name="VTK Menskes" laps=15 />
			<TeamRow position="10" logo="images/vtk.png" name="VTK Menskes" laps=15 />
		</tbody>
		<tbody>
			<TeamRow position="11" logo="images/vtk.png" name="VTK Menskes" laps=15 />
			<TeamRow position="12" logo="images/vtk.png" name="VTK Menskes" laps=15 />
			<TeamRow position="13" logo="images/vtk.png" name="VTK Menskes" laps=15 />
			<TeamRow position="14" logo="images/vtk.png" name="VTK Menskes" laps=15 />
			<TeamRow position="15" logo="images/vtk.png" name="VTK Menskes" laps=15 />
			<TeamRow position="16" logo="images/vtk.png" name="VTK Menskes" laps=15 />
			<TeamRow position="17" logo="images/vtk.png" name="VTK Menskes" laps=15 />
			<TeamRow position="18" logo="images/vtk.png" name="VTK Menskes" laps=15 />
			<TeamRow position="19" logo="images/vtk.png" name="VTK Menskes" laps=15 />
			<TeamRow position="20" logo="images/vtk.png" name="VTK Menskes" laps=15 />
		</tbody>
		<tbody>
			<TeamRow position="21" logo="images/vtk.png" name="VTK Menskes" laps=15 />
			<TeamRow position="22" logo="images/vtk.png" name="VTK Menskes" laps=15 />
			<TeamRow position="23" logo="images/vtk.png" name="VTK Menskes" laps=15 />
			<TeamRow position="24" logo="images/vtk.png" name="VTK Menskes" laps=15 />
			<TeamRow position="25" logo="images/vtk.png" name="VTK Menskes" laps=15 />
			<TeamRow position="26" logo="images/vtk.png" name="VTK Menskes" laps=15 />
			<TeamRow position="27" logo="images/vtk.png" name="VTK Menskes" laps=15 />
			<TeamRow position="28" logo="images/vtk.png" name="VTK Menskes" laps=15 />
			<TeamRow position="29" logo="images/vtk.png" name="VTK Menskes" laps=15 />
			<TeamRow position="30" logo="images/vtk.png" name="VTK Menskes" laps=15 />
		</tbody>
		<tbody>
			<TeamRow position="31" logo="images/vtk.png" name="VTK Menskes" laps=15 />
			<TeamRow position="32" logo="images/vtk.png" name="VTK Menskes" laps=15 />
			<TeamRow position="33" logo="images/vtk.png" name="VTK Menskes" laps=15 />
			<TeamRow position="34" logo="images/vtk.png" name="VTK Menskes" laps=15 />
			<TeamRow position="35" logo="images/vtk.png" name="VTK Menskes" laps=15 />
		</tbody>
	</table>
{:catch err}
	<p class="error">Error loading standings...<br>{err}</p>
{/await}

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
