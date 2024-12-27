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
    console.log('Raw data from mockData.json:', this.data[collection])
    const data = deepClone(this.data[collection])
    console.log('Data after deepClone:', data)
  
    if (collection === 'groups' && params?.ids) {
      // First verify we have all groups from the initial data
      console.log('All available groups:', data.length) // Should be 2 based on your mockData.json

      const groupIds = Array.isArray(params.ids) 
        ? params.ids 
        : typeof params.ids === 'string'
          ? params.ids.split(',')
          : []

      console.log('Group IDs to filter:', groupIds)
      
      // Check the actual data structure
      const isArray = Array.isArray(data)
      console.log('Is data an array?', isArray)
      
      const filteredGroups = isArray
        ? data.filter((group: any) => {
            const included = groupIds.includes(group.id)
            console.log(`Group ${group.id} included?`, included)
            return included
          })
        : []

      console.log('Filtered groups:', filteredGroups)
      return filteredGroups
    }
    
    return data
  }

  updateData(collection: keyof typeof initialMockData, data: any) {
    this.data[collection] = deepClone(data)
    this.persistToLocalStorage()
    return this.getData(collection)
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