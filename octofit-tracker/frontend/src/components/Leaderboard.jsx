import DataPage from './DataPage'
import { formatDate, formatReference } from '../formatters'

export default function Leaderboard() {
  return (
    <DataPage
      collection="leaderboard"
      endpointPath="/api/leaderboard/"
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