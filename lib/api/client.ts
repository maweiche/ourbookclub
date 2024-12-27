// src/lib/api/client.ts
import { ApiResponse } from '../types'
import { mockDb } from './mockDb'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'
const SIMULATED_DELAY = 1000

export interface ApiOptions extends RequestInit {
  params?: Record<string, string | string[]>  // Update this to allow array values
}

type MockCollections = 'users' | 'groups' | 'books' | 'readingProgress' | 'discussions'

function isValidCollection(collection: string): collection is MockCollections {
  return ['users', 'groups', 'books', 'readingProgress', 'discussions'].includes(collection)
}

function handleMockUpdate(
  collection: string,
  action: string | undefined,
  currentData: any | any[],
  body: any
): any[] {
  if (!isValidCollection(collection)) {
    throw new Error(`Invalid collection: ${collection}`)
  }

  // Ensure we're working with an array
  const dataArray = Array.isArray(currentData) ? currentData : [currentData]

  switch (collection) {
    case 'groups':
      if (action === 'create') {
        return [...dataArray, { ...body, id: `g${dataArray.length + 1}` }]
      }
      if (action?.startsWith('update')) {
        const id = action.split('/')[1]
        return dataArray.map(item => 
          item.id === id ? { ...item, ...body } : item
        )
      }
      break

    case 'books':
      if (action === 'vote') {
        const { bookId, userId, value } = body
        return dataArray.map(book => {
          if (book.id === bookId) {
            const votes = book.votes.filter((v: { userId: any }) => v.userId !== userId)
            votes.push({ userId, value })
            return { ...book, votes }
          }
          return book
        })
      }
      break

    case 'users':
      if (action === 'update') {
        return dataArray.map(user => 
          user.id === body.id ? { ...user, ...body } : user
        )
      }
      break
  }

  return dataArray
}

export async function apiClient<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<ApiResponse<T>> {
  try {
    if (process.env.NODE_ENV === 'development') {
      const [collection, ...actionParts] = endpoint.split('/').filter(Boolean)
      const action = actionParts.join('/')
      
      console.log('API Client called with:', { 
        endpoint, 
        collection, 
        action, 
        options,
        params: options.params
      })

      await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY))

      if (!isValidCollection(collection)) {
        throw new Error(`Invalid collection: ${collection}`)
      }

      // Pass params directly without any transformation
      const data = mockDb.getData(collection, options.params)
      console.log('API Client response data:', data)
      return { data: data as T, error: null }
    }

    // Production API calls
    const url = new URL(`${BASE_URL}${endpoint}`)
    if (options.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(val => url.searchParams.append(key, val))
        } else {
          url.searchParams.append(key, value)
        }
      })
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`)
    }

    const data = await response.json()
    return { data, error: null }
  } catch (error) {
    console.error('API Error:', error)
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    }
  }
}