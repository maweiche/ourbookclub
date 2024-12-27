// src/components/Dashboard/GroupOverview.tsx
'use client'

import { useGroupStore } from '@/lib/stores/groupStore'
import { useUserStore } from '@/lib/stores/userStore'

const GroupOverview = () => {
  const { groups, isLoading, error } = useGroupStore()
  const { activeGroupId, setActiveGroup } = useUserStore()

  if (isLoading) {
    return <div className="bg-white rounded-lg shadow p-6">Loading groups...</div>
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-red-500">Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Your Groups</h2>
      {groups.size === 0 ? (
        <p className="text-gray-500">No groups found</p>
      ) : (
        <div className="space-y-4">
          {Array.from(groups.values()).map(group => (
            <div 
              key={group.id} 
              onClick={() => setActiveGroup(group.id)}
              className={`border rounded-md p-4 hover:border-blue-500 cursor-pointer transition-colors
                ${activeGroupId === group.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
              `}
            >
              <h3 className="font-medium">{group.name}</h3>
              <p className="text-sm text-gray-600">{group.description}</p>
              <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                <span>{group.memberIds.length} members</span>
                {group.currentBookId && (
                  <span>•</span>
                )}
                {group.adminIds.includes('u1') && (
                  <span className="text-blue-600">Admin</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default GroupOverview