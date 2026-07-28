import DataPage from './DataPage'
import { formatList } from '../formatters'

export default function Workouts() {
  return (
    <DataPage
      collection="workouts"
      endpointPath="/api/workouts/"
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