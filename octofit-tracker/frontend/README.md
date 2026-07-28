# Octofit Tracker Frontend

React 19 presentation tier for the Octofit Tracker multi-tier application. The app uses Vite, Bootstrap, and `react-router-dom` to display users, teams, activities, leaderboard entries, and workout recommendations from the Node.js API.

## Environment

For GitHub Codespaces, define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local`:

```text
VITE_CODESPACE_NAME=<your-codespace-name>
```

When `VITE_CODESPACE_NAME` is set, the frontend requests the API at:

```text
https://<your-codespace-name>-8000.app.github.dev/api/[component]/
```

When `VITE_CODESPACE_NAME` is unset, the frontend safely falls back to local development URLs under:

```text
http://localhost:8000/api/[component]/
```

This fallback prevents accidental `https://undefined-8000.app.github.dev` requests.

## Scripts

```bash
npm --prefix octofit-tracker/frontend run dev
npm --prefix octofit-tracker/frontend run build
npm --prefix octofit-tracker/frontend run lint
```

The backend should be running on port `8000` before opening the frontend.
