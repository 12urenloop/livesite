<script lang="ts">
	export let position: string;
	export let logo: string;
	export let name: string;
	export let laps: string;
	export let cell_count: number;

	const font_style = {"font-size": `${Math.min((40/cell_count)*1.1, 5)}rem`};

	$: font_style_css = Object.entries(font_style)
		.map(([k, v]) => `${k}:${v}`)
		.join(";");
</script>

<div class="wrapper" style="{font_style_css}">
	<div class="position">#{position}</div>
	<div class="logo"><img src={logo} alt="Logo" class="logo__image"></div>
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

		div {
			padding: 0.5rem;
			display: flex;
			flex-flow: row nowrap;
			justify-content: center;
			align-items: center;

			&.position {
				min-width: 3em;
				border-right: 2px solid #AAAAAA;
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
