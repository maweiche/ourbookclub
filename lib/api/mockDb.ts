// src/lib/api/mockDb.ts
import { deepClone } from '@/lib/utils'
import initialMockData from '../data/mockData.json'

class MockDatabase {
  private data: typeof initialMockData

  constructor() {
    console.log('Initial mockData:', initialMockData)
    console.log('Groups in mockData:', initialMockData.groups)
    this.data = deepClone(initialMockData)
  }

  getData(collection: keyof typeof initialMockData, params?: any) {
    console.log('MockDB getData called:', { collection, params })
    const data = deepClone(this.data[collection])
    
    if (collection === 'groups' && params?.ids) {
      // Ensure ids parameter is always an array
      const groupIds = Array.isArray(params.ids) 
        ? params.ids 
        : [params.ids]

      console.log('Filtering groups by IDs:', groupIds)
      // Filter groups and log the result
      const filteredGroups = data.filter((group: any) => 
        groupIds.includes(group.id)
      )
      console.log('Filtered groups result:', filteredGroups)
      return filteredGroups
    }
    
    if (collection === 'users' && params?.id) {
      return data.find((user: any) => user.id === params.id)
    }

    return data
  }

  updateData(collection: keyof typeof initialMockData, data: any) {
    this.data[collection] = deepClone(data)
  }

  private persistToLocalStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mockDb', JSON.stringify(this.data))
    }
  }

  loadPersistedData() {
    if (typeof window !== 'undefined') {
      const persisted = localStorage.getItem('mockDb')
      if (persisted) {
        this.data = JSON.parse(persisted)
      }
    }
  }
}

console.log('mockData import check:', {
  mockData: initialMockData,
  groupsCount: initialMockData.groups.length
})

export const mockDb = new MockDatabase()