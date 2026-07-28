import DataPage from './DataPage'
import { formatDate, formatList } from '../formatters'

export default function Teams() {
  return (
    <DataPage
      collection="teams"
      endpointPath="/api/teams/"
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