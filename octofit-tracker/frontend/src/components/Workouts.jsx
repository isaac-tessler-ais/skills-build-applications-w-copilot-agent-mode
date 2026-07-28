import DataPage from './DataPage'
import { formatList } from '../formatters'

const apiEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`

export default function Workouts() {
  return (
    <DataPage
      collection="workouts"
      endpointPath={apiEndpoint}
      eyebrow="Recommendations"
      title="Workouts"
      description="Suggested training sessions for balanced fitness progress."
      columns={['Workout', 'Intensity', 'Duration', 'Muscle groups', 'Description']}
      renderRow={(workout) => (
        <tr key={workout._id ?? workout.name}>
          <td className="fw-semibold">{workout.name}</td>
          <td>
            <span className={`intensity-badge intensity-${workout.intensity}`}>
              {workout.intensity}
            </span>
          </td>
          <td>{workout.durationMinutes} min</td>
          <td>{formatList(workout.targetMuscleGroups)}</td>
          <td>{workout.description}</td>
        </tr>
      )}
    />
  )
}