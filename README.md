# livesite

Shows the current leaderboard of the 12urenloop competition.

Copy the `.env.template` to a `.env` file and modify the url if needed

Logos for each team go in the `static/images/teams` folder and
must be in the format `{team_name}.png` (note that team name is lowercase). Team names that contain a `-` will be split and both parts will be loaded.
For example: `Zeus - Zeus` will load the `zeus.png` image twice.

Run with `docker-compose up --build`.

## Requirements

- Node >= 18
- Pnpm (Please use this instead of yarn or npm)
