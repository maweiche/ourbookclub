// src/lib/stores/userStore.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { User } from '@/lib/types'
import { api } from '@/lib/api/endpoints'
import { useGroupStore } from './groupStore'

interface UserState {
  currentUser: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  activeGroupId: string | null
  login: () => Promise<void>
  logout: () => Promise<void>
  setActiveGroup: (groupId: string) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      activeGroupId: null,

      login: async () => {
        set({ isLoading: true, error: null })
        
        try {
          const { data: userData, error: userError } = await api.auth.login()

          if (userError || !userData) {
            set({ error: userError || 'Failed to fetch user data', isLoading: false })
            return
          }

          console.log('Login response:', userData) // Debug log

          // Check if user has groups before trying to fetch them
          if (userData.groupIds && userData.groupIds.length > 0) {
            console.log('Fetching groups for:', userData.groupIds) // Debug log
            await useGroupStore.getState().fetchGroups(userData.groupIds)
          }

          set({ 
            currentUser: userData,
            isAuthenticated: true,
            activeGroupId: userData.groupIds?.[0] || null,
            isLoading: false,
            error: null
          })
        } catch (err) {
          console.error('Login error:', err) // Debug log
          set({ 
            error: err instanceof Error ? err.message : 'Login failed',
            isLoading: false
          })
        }
      },

      logout: async () => {
        set({ isLoading: true, error: null })
        
        try {
          const { error } = await api.auth.logout()

          if (error) {
            set({ error, isLoading: false })
            return
          }

          // Clear the group store state
          useGroupStore.setState({ groups: new Map() })

          set({ 
            currentUser: null,
            isAuthenticated: false,
            activeGroupId: null,
            isLoading: false,
            error: null
          })
        } catch (err) {
          set({ 
            error: err instanceof Error ? err.message : 'Logout failed',
            isLoading: false
          })
        }
      },

      setActiveGroup: (groupId) => set({ activeGroupId: groupId })
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
        activeGroupId: state.activeGroupId
      })
    }
  )
)