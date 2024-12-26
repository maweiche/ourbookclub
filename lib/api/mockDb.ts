// src/lib/api/mockDb.ts
import { deepClone } from '@/lib/utils'
import initialMockData from '../data/mockData.json'

class MockDatabase {
  private data: typeof initialMockData

  constructor() {
    // Load initial data
    this.data = deepClone(initialMockData)
  }

  // CRUD operations
  getData(collection: keyof typeof initialMockData, params?: any) {
    const data = deepClone(this.data[collection])
    
    if (collection === 'users' && params?.id) {
      // For single user fetch, return the specific user
      return data.find((user: any) => user.id === params.id)
    }
    
    if (collection === 'groups' && params?.ids) {
      const groupIds = params.ids.split(',')
      return data.filter((group: any) => groupIds.includes(group.id))
    }
    
    return data
  }

  updateData(collection: keyof typeof initialMockData, data: any) {
    this.data[collection] = deepClone(data)
    this.persistToLocalStorage()
    return this.getData(collection)
  }

  // Persist mock data to localStorage to maintain state across refreshes
  private persistToLocalStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mockDb', JSON.stringify(this.data))
    }
  }

  // Load persisted data from localStorage
  loadPersistedData() {
    if (typeof window !== 'undefined') {
      const persisted = localStorage.getItem('mockDb')
      if (persisted) {
        this.data = JSON.parse(persisted)
      }
    }
  }

  // Reset to initial state
  reset() {
    this.data = deepClone(initialMockData)
    this.persistToLocalStorage()
  }
}

export const mockDb = new MockDatabase()

// Initialize persisted data when module loads
mockDb.loadPersistedData()