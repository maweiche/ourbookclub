// userStore.ts
import { create } from 'zustand'
import mockData from '../data/mockData.json'
import { UserState } from '../types'

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  isAuthenticated: false,
  activeGroupId: null,

  login: (userData) =>
    set({
      currentUser: userData,
      isAuthenticated: true,
      // Set first group as active if user has any groups
      activeGroupId: userData.groupIds[0] || null,
    }),

  logout: () =>
    set({
      currentUser: null,
      isAuthenticated: false,
      activeGroupId: null,
    }),

  setActiveGroup: (groupId) => set({ activeGroupId: groupId }),
}))
