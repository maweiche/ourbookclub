// /src/lib/types/user.ts
export interface User {
  id: string
  name: string
  email: string
  profilePicture?: string
  readingPreferences: string[]
  groupIds: string[]
}

export interface UserState {
  currentUser: User | null
  isAuthenticated: boolean
  activeGroupId: string | null
  login: (userData: User) => void
  logout: () => void
  setActiveGroup: (groupId: string) => void
}
