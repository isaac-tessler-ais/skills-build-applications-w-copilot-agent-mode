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

When `VITE_CODESPACE_NAME` is unset, the frontend uses same-origin `/api/[component]/` requests, and the Vite dev server proxies them to the backend at `http://localhost:8000`. This lets the localhost frontend reach the API without requiring port `8000` to be reachable directly from the browser, and it prevents accidental `https://undefined-8000.app.github.dev` requests.

If the app is opened through the Codespaces forwarded URL and `VITE_CODESPACE_NAME` is missing, it also infers the Codespace name from the current `-5173.app.github.dev` hostname so browser requests still target the matching port `8000` API.

## Scripts

```bash
npm --prefix octofit-tracker/frontend run dev
npm --prefix octofit-tracker/frontend run build
npm --prefix octofit-tracker/frontend run lint
```

The backend should be running on port `8000` before opening the frontend.
