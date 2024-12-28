// src/lib/stores/groupStore.ts
import { create } from 'zustand'
import { Group } from '@/lib/types'
import { api } from '@/lib/api/endpoints'

let currentFetchPromise: Promise<void> | null = null

interface GroupState {
  groups: Map<string, Group>
  currentGroup: Group | null
  isLoading: boolean
  error: string | null
  fetchGroups: (userGroupIds: string[]) => Promise<void>
  setCurrentGroup: (groupId: string) => void
  addMember: (groupId: string, userId: string) => Promise<void>
  updateGroup: (groupId: string, updates: Partial<Group>) => Promise<void>
}

export const useGroupStore = create<GroupState>((set, get) => ({
  groups: new Map(),
  currentGroup: null,
  isLoading: false,
  error: null,

  fetchGroups: async (userGroupIds: string[]) => {
    // If there's already a fetch in progress, wait for it
    if (currentFetchPromise) {
      await currentFetchPromise
      return
    }

    set({ isLoading: true, error: null })
    
    try {
      console.log('Fetching groups for IDs:', userGroupIds)
      currentFetchPromise = (async () => {
        const { data, error } = await api.groups.list(userGroupIds)

        if (error) {
          console.error('Error fetching groups:', error)
          set({ error, isLoading: false })
          return
        }

        if (data && Array.isArray(data)) {
          console.log('Received groups data:', data)
          const groupsMap = new Map()
          data.forEach(group => {
            groupsMap.set(group.id, group)
          })
          
          set({ 
            groups: groupsMap,
            isLoading: false,
            error: null
          })
        }
      })()

      await currentFetchPromise
    } catch (err) {
      console.error('Failed to fetch groups:', err)
      set({ 
        error: err instanceof Error ? err.message : 'Failed to fetch groups',
        isLoading: false
      })
    } finally {
      currentFetchPromise = null
    }
  },

  setCurrentGroup: (groupId: string) => {
    const group = get().groups.get(groupId)
    if (group) {
      set({ currentGroup: group })
    }
  },

  addMember: async (groupId: string, userId: string) => {
    set({ isLoading: true, error: null })
    
    const group = get().groups.get(groupId)
    if (!group) return

    try {
      const { data, error } = await api.groups.update(groupId, {
        memberIds: [...group.memberIds, userId]
      })

      if (error) {
        set({ error, isLoading: false })
        return
      }

      if (data) {
        const groups = get().groups
        groups.set(groupId, data)
        set({ 
          groups: new Map(groups),
          isLoading: false,
          error: null
        })
      }
    } catch (err) {
      set({ 
        error: err instanceof Error ? err.message : 'Failed to add member',
        isLoading: false 
      })
    }
  },

  updateGroup: async (groupId: string, updates: Partial<Group>) => {
    set({ isLoading: true, error: null })
    
    try {
      const { data, error } = await api.groups.update(groupId, updates)

      if (error) {
        set({ error, isLoading: false })
        return
      }

      if (data) {
        const groups = get().groups
        groups.set(groupId, data)
        set({ 
          groups: new Map(groups),
          isLoading: false,
          error: null 
        })
      }
    } catch (err) {
      set({ 
        error: err instanceof Error ? err.message : 'Failed to update group',
        isLoading: false
      })
    }
  },
}))