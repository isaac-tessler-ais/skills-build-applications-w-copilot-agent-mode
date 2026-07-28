export function formatDate(value) {
  if (!value) {
    return 'Not recorded'
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export function formatReference(value, emptyLabel = 'Unassigned') {
  if (!value) {
    return emptyLabel
  }

  if (typeof value === 'object') {
    return value.displayName ?? value.name ?? value.username ?? value._id ?? emptyLabel
  }

  return String(value)
}

export function formatList(value) {
  if (!Array.isArray(value) || value.length === 0) {
    return 'None listed'
  }

  return value.map((item) => formatReference(item, 'Unknown')).join(', ')
}