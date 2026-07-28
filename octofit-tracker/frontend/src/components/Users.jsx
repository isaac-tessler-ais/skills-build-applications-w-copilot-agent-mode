import DataPage from './DataPage'
import { formatDate, formatReference } from '../formatters'

export default function Users() {
  return (
    <DataPage
      collection="users"
      endpointPath="/api/users/"
      eyebrow="Members"
      title="Users"
      description="Profiles for athletes participating in Octofit challenges."
      columns={['Display name', 'Username', 'Email', 'Team', 'Created']}
      renderRow={(user) => (
        <tr key={user._id ?? user.email}>
          <td className="fw-semibold">{user.displayName}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{formatReference(user.team)}</td>
          <td>{formatDate(user.createdAt)}</td>
        </tr>
      )}
    />
  )
}