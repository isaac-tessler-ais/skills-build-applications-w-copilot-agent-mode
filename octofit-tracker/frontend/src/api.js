const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBaseUrl = codespaceName
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

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