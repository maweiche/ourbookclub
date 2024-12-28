// src/lib/hooks/useCache.ts
import { useState, useEffect } from 'react'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface CacheEntry<T> {
  data: T
  timestamp: number
}

interface CacheStore {
  cache: Record<string, CacheEntry<any>>
  set: (key: string, data: any) => void
  get: (key: string) => any
  invalidate: (key: string) => void
  isStale: (key: string, maxAge: number) => boolean
}

const useCacheStore = create<CacheStore>()(
  subscribeWithSelector((set, get) => ({
    cache: {},

    set: (key, data) =>
      set((state) => ({
        cache: {
          ...state.cache,
          [key]: {
            data,
            timestamp: Date.now(),
          },
        },
      })),

    get: (key) => get().cache[key]?.data,

    invalidate: (key) =>
      set((state) => {
        const { [key]: _, ...rest } = state.cache
        return { cache: rest }
      }),

    isStale: (key, maxAge) => {
      const entry = get().cache[key]
      if (!entry) return true
      return Date.now() - entry.timestamp > maxAge
    },
  }))
)

// Custom hook for cached data fetching
export function useCache<T>(
  key: string,
  fetchFn: () => Promise<T>,
  options = {
    maxAge: 5 * 60 * 1000, // 5 minutes default
    revalidateOnMount: true,
    revalidateOnFocus: true,
  }
) {
  const cache = useCacheStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = async (force = false) => {
    // Check cache first
    if (!force && !cache.isStale(key, options.maxAge)) {
      return cache.get(key)
    }

    setIsLoading(true)
    setError(null)

    try {
      const data = await fetchFn()
      cache.set(key, data)
      return data
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
      return null
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (options.revalidateOnMount) {
      fetchData()
    }
  }, [key])

  useEffect(() => {
    if (options.revalidateOnFocus) {
      const onFocus = () => {
        if (cache.isStale(key, options.maxAge)) {
          fetchData()
        }
      }

      window.addEventListener('focus', onFocus)
      return () => window.removeEventListener('focus', onFocus)
    }
  }, [key, options.maxAge])

  return {
    data: cache.get(key),
    isLoading,
    error,
    refetch: () => fetchData(true),
    invalidate: () => cache.invalidate(key),
  }
}
