// /src/components/Group/GroupHeader.tsx
'use client'

import { Group } from '@/lib/types'
import { useUserStore } from '@/lib/stores/userStore'
import BookTitle from '@/components/Book/BookTitle'

interface GroupHeaderProps {
  group: Group
}

const GroupHeader = ({ group }: GroupHeaderProps) => {
  const currentUser = useUserStore((state) => state.currentUser)
  const isAdmin = group.adminIds.includes(currentUser?.id || '')

  return (
    <div className="mb-6 rounded-lg bg-white p-6 shadow">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{group.name}</h1>
          <p className="mt-1 text-gray-600">{group.description}</p>
        </div>
        {isAdmin && (
          <button className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition-colors">
            Manage Group
          </button>
        )}
      </div>
      <div className="mt-4 flex items-center space-x-6">
        <div className="text-sm text-gray-500">
          <span className="font-medium">{group.memberIds.length}</span> members
        </div>
        <div className="text-sm text-gray-500">
          <span className="font-medium">{group.readingHistory.length}</span> books read
        </div>
        {group.currentBookId && (
          <BookTitle bookId={group.currentBookId} />
        )}
      </div>
    </div>
  )
}

export default GroupHeader