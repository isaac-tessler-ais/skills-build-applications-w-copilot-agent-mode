import DataPage from './DataPage'
import { formatDate, formatReference } from '../formatters'

export default function Activities() {
  return (
    <DataPage
      collection="activities"
      endpointPath="/api/activities/"
      eyebrow="Training log"
      title="Activities"
      description="Completed workouts and point-earning activity sessions."
      columns={['Activity', 'Duration', 'Points', 'Completed', 'User']}
      renderRow={(activity) => (
        <tr key={activity._id ?? `${activity.activityType}-${activity.completedAt}`}>
          <td className="fw-semibold">{activity.activityType}</td>
          <td>{activity.durationMinutes} min</td>
          <td>{activity.points}</td>
          <td>{formatDate(activity.completedAt)}</td>
          <td>{formatReference(activity.user)}</td>
        </tr>
      )}
    />
  )
}