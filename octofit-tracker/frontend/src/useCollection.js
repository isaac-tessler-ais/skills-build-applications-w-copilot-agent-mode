import { useEffect, useState } from 'react'

import { fetchCollection } from './api'

export function useCollection(collection) {
  const [records, setRecords] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadCollection() {
      setIsLoading(true)
      setError('')

      try {
        const nextRecords = await fetchCollection(collection, controller.signal)
        setRecords(nextRecords)
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadCollection()

    return () => controller.abort()
  }, [collection])

  return { error, isLoading, records }
}