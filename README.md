# livesite

Shows the current leaderboard of the 12urenloop competition.

Configure the loxsi url in `src/Leaderboard.svelte`.

Logos for each team go in the `static/images/teams` folder and
must be in the format `{team_name}.png` (note that team name is lowercase). Team names that contain a `-` will be split and both parts will be loaded.
For example: `Zeus - Zeus` will load the `zeus.png` image twice.

Run with `docker-compose up --build`.
