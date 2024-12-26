// groupStore.ts
import { create } from 'zustand'
import mockData from '../data/mockData.json'
import { GroupState } from '../types'

export const useGroupStore = create<GroupState>((set, get) => ({
  groups: new Map(),
  currentGroup: null,

  fetchGroups: (userGroupIds) => {
    const groupsMap = new Map()
    const userGroups = mockData.groups.filter((g) =>
      userGroupIds.includes(g.id)
    )
    userGroups.forEach((group) => groupsMap.set(group.id, group))
    set({ groups: groupsMap })
  },

  setCurrentGroup: (groupId) => {
    const group = get().groups.get(groupId)
    if (group) {
      set({ currentGroup: group })
    }
  },

  addMember: (groupId, userId) => {
    const groups = get().groups
    const group = groups.get(groupId)
    if (group && !group.memberIds.includes(userId)) {
      const updatedGroup = {
        ...group,
        memberIds: [...group.memberIds, userId],
      }
      groups.set(groupId, updatedGroup)
      set({ groups: new Map(groups) })
    }
  },

  updateGroup: (groupId, updates) => {
    const groups = get().groups
    const group = groups.get(groupId)
    if (group) {
      const updatedGroup = { ...group, ...updates }
      groups.set(groupId, updatedGroup)
      set({ groups: new Map(groups) })
    }
  },
}))
