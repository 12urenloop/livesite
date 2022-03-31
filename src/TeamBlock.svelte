<script lang="ts">
	/** The teams position in the ranking */
	export let position: string;
	/** The path to the teams logo image */
	export let logo: string;
	/** The team name */
	export let name: string;
	/** How many laps the team has ran so far */
	export let laps: string;
	/** The font size of the cell */
	export let font_size: number;

	const font_size_css = `font-size: ${font_size}rem;`;
</script>

<div class="wrapper" style="{font_size_css}">
	<div class="position">#{position}</div>
	<!-- <div class="logo"><img src={logo} alt="Logo" class="logo__image"></div> -->
	<div class="name">{name}</div>
	<div class="laps">{laps}</div>
</div>

<style lang="scss">
	@import "./lib/colors.scss";

	.wrapper {
		font-size: max(1.5vw, 1rem);
		display: flex;
		flex-flow: row nowrap;
		padding: 0;
		border: 0.2rem solid $zeus;
		// border-right: 0.2rem solid $zeus;

		// &:first-child {
		// 	border-left: 0.2rem solid $zeus;
		// }

		div {
			padding: 0.2rem;
			display: flex;
			flex-flow: row nowrap;
			justify-content: center;
			align-items: center;

			&.position {
				min-width: 3em;
				border-right: 2px solid #AAAAAA;
			}

			&.name {
				min-width: 16em;
			}

			&.logo {
				.logo__image {
					padding: 0;
					margin: 0;

					width: 3.5rem;
					height: 3.5rem;
				}
			}

			&.laps {
				min-width: 3em;
				border-left: 2px solid #AAAAAA;
			}
		}
	}
</style>
