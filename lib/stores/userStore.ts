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

          // Ensure we store the complete user data
          const completeUserData = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            profilePicture: userData.profilePicture,
            readingPreferences: userData.readingPreferences,
            groupIds: userData.groupIds
          }

          console.log('Setting user data:', completeUserData)

          set({ 
            currentUser: completeUserData,
            isAuthenticated: true,
            activeGroupId: completeUserData.groupIds?.[0] || null,
            isLoading: false,
            error: null
          })
        } catch (err) {
          console.error('Login error:', err)
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
        currentUser: state.currentUser ? {
          ...state.currentUser,
          groupIds: [...state.currentUser.groupIds] // Ensure groupIds array is properly cloned
        } : null,
        isAuthenticated: state.isAuthenticated,
        activeGroupId: state.activeGroupId
      })
    }
  )
)