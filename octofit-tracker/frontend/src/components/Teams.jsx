import DataPage from './DataPage'
import { formatDate, formatList } from '../formatters'

const apiEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`

export default function Teams() {
  return (
    <DataPage
      collection="teams"
      endpointPath={apiEndpoint}
      eyebrow="Groups"
      title="Teams"
      description="Team rosters and mascots for friendly competition."
      columns={['Name', 'Mascot', 'Members', 'Created']}
      renderRow={(team) => (
        <tr key={team._id ?? team.name}>
          <td className="fw-semibold">{team.name}</td>
          <td>{team.mascot ?? 'No mascot'}</td>
          <td>{formatList(team.members)}</td>
          <td>{formatDate(team.createdAt)}</td>
        </tr>
      )}
    />
  )
}