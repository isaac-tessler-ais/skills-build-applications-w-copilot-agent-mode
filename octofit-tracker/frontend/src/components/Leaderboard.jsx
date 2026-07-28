import DataPage from './DataPage'
import { formatDate, formatReference } from '../formatters'

const apiEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`

export default function Leaderboard() {
  return (
    <DataPage
      collection="leaderboard"
      endpointPath={apiEndpoint}
      eyebrow="Standings"
      title="Leaderboard"
      description="Current competitive rankings sorted by the API."
      columns={['Rank', 'User', 'Team', 'Points', 'Updated']}
      renderRow={(entry, index) => (
        <tr key={entry._id ?? `${entry.user}-${entry.points}`}>
          <td className="fw-semibold">{entry.rank ?? index + 1}</td>
          <td>{formatReference(entry.user)}</td>
          <td>{formatReference(entry.team)}</td>
          <td>{entry.points}</td>
          <td>{formatDate(entry.updatedAt)}</td>
        </tr>
      )}
    />
  )
}