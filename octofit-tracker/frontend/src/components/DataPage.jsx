import { buildEndpoint } from '../api'
import { useCollection } from '../useCollection'

function PageState({ children }) {
  return <div className="page-state border rounded-3 bg-white p-4">{children}</div>
}

export default function DataPage({ collection, endpointPath, eyebrow, title, description, columns, renderRow }) {
  const { error, isLoading, records } = useCollection(collection)

  return (
    <section className="data-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow text-uppercase fw-semibold mb-2">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="lead text-secondary mb-0">{description}</p>
        </div>
        <div className="endpoint-pill" title={buildEndpoint(collection)}>
          {endpointPath}
        </div>
      </div>

      {isLoading && <PageState>Loading {collection}...</PageState>}

      {error && !isLoading && (
        <PageState>
          <p className="fw-semibold text-danger mb-2">Unable to load {collection}.</p>
          <p className="mb-0 text-secondary">{error}</p>
        </PageState>
      )}

      {!error && !isLoading && records.length === 0 && (
        <PageState>No {collection} have been recorded yet.</PageState>
      )}

      {!error && !isLoading && records.length > 0 && (
        <div className="table-shell border rounded-3 bg-white">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th scope="col" key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>{records.map(renderRow)}</tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  )
}