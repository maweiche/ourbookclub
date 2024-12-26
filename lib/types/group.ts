// /src/lib/types/group.ts
export interface Meeting {
  id: string
  groupId: string
  date: string
  location: string
  description: string
  attendees: string[]
}

export interface Group {
  id: string
  name: string
  description: string
  adminIds: string[]
  memberIds: string[]
  currentBookId?: string
  password: string
  meetingSchedule: Meeting[]
  suggestedBooks: string[]
  readingHistory: {
    bookId: string
    completedDate: string
  }[]
}

export interface GroupState {
  groups: Map<string, Group>
  currentGroup: Group | null
  fetchGroups: (userGroupIds: string[]) => void
  setCurrentGroup: (groupId: string) => void
  addMember: (groupId: string, userId: string) => void
  updateGroup: (groupId: string, updates: Partial<Group>) => void
}
