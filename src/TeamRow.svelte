<script lang="ts">
	export let position: string;
	export let logo: string;
	export let name: string;
	export let laps: string;
</script>

<tr>
	<td class="position">#{position}</td>
	<td class="logo"><img src={logo} alt="Logo" class="logo__image"></td>
	<td class="name">{name}</td>
	<td class="laps">{laps}</td>
</tr>

<style lang="scss">
	@import "./lib/colors.scss";

	@mixin adaptive_hover_bg($color) {
		background-color: $color;

		&:hover {
			background-color: darken($color, 2%);
		}
	}

	tr {
		font-size: max(1.5vw, 1rem);
		border-top: 2px solid #AAAAAA;
		border-bottom: 2px solid #AAAAAA;

		&:nth-child(even) {
			@include adaptive_hover_bg(darken($background, 10%));
		}

		&:nth-child(odd) {
			@include adaptive_hover_bg($background);
		}

		td {
			:not(&.logo) {
				padding: 0.5rem;
			}

			&.position {
				min-width: 3.5rem;
				border-right: 2px solid #AAAAAA;
			}

			&.logo {
				display: flex;
				flex-flow: row nowrap;
				justify-content: center;
				align-items: center;

				.logo__image {
					padding: 0;
					margin: 0;

					width: 3.5rem;
					height: 3.5rem;
				}
			}

			&.laps {
				min-width: 3.5rem;
				border-left: 2px solid #AAAAAA;
			}
		}

		// 1 column
		@media screen and (max-width: 595px) {
			// Prevent double borders between adjacent tbodies
			&:first-child {
				border-top: none;
			}
		}
	}
</style>
