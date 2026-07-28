const envCodespaceName = import.meta.env.VITE_CODESPACE_NAME

function getCodespaceName() {
  if (envCodespaceName) {
    return envCodespaceName
  }

  const hostname = window.location.hostname
  const frontendHostSuffix = '-5173.app.github.dev'

  if (hostname.endsWith(frontendHostSuffix)) {
    return hostname.slice(0, -frontendHostSuffix.length)
  }

  return ''
}

const codespaceName = getCodespaceName()

// When a Codespace name is available, call the forwarded backend directly.
// Otherwise use a same-origin '/api' path that the Vite dev server proxies
// to http://localhost:8000, so the localhost frontend always reaches the API.
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : '/api'

export function buildEndpoint(collection) {
  return `${apiBaseUrl}/${collection}/`
}

export function normalizeCollectionResponse(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  const candidates = [
    payload?.results,
    payload?.data,
    payload?.items,
    payload?.docs,
    payload?.records,
    payload?.data?.results,
    payload?.data?.items,
    payload?.data?.docs,
  ]

  return candidates.find(Array.isArray) ?? []
}

export async function fetchCollection(collection, signal) {
  const response = await fetch(buildEndpoint(collection), { signal })

  if (!response.ok) {
    throw new Error(`Request failed for ${collection}: ${response.status}`)
  }

  const payload = await response.json()
  return normalizeCollectionResponse(payload)
}