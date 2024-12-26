// src/components/Dashboard/GroupOverview.tsx
'use client'

import { useGroupStore } from '@/lib/stores/groupStore'

const GroupOverview = () => {
  const { groups, isLoading, error } = useGroupStore()

  if (isLoading) {
    return <div>Loading groups...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
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
              className="border rounded-md p-4 hover:border-blue-500 cursor-pointer"
            >
              <h3 className="font-medium">{group.name}</h3>
              <p className="text-sm text-gray-600">{group.description}</p>
              <div className="mt-2 text-sm text-gray-500">
                {group.memberIds.length} members
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default GroupOverview