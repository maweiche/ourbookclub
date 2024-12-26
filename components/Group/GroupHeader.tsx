// /src/components/Group/GroupHeader.tsx
import { useGroupStore } from '@/lib/stores/groupStore'
import { useUserStore } from '@/lib/stores/userStore'

const GroupHeader = () => {
  const currentGroup = useGroupStore((state) => state.currentGroup)
  const currentUser = useUserStore((state) => state.currentUser)

  const isAdmin = currentGroup?.adminIds.includes(currentUser?.id || '')

  return (
    <div className="mb-6 rounded-lg bg-white p-6 shadow">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{currentGroup?.name}</h1>
          <p className="mt-1 text-gray-600">{currentGroup?.description}</p>
        </div>
        {isAdmin && (
          <button className="rounded-md bg-blue-500 px-4 py-2 text-white">
            Manage Group
          </button>
        )}
      </div>
      <div className="mt-4 flex items-center space-x-4">
        <div className="text-sm text-gray-500">
          {currentGroup?.memberIds.length} members
        </div>
        <div className="text-sm text-gray-500">
          {currentGroup?.readingHistory.length} books read
        </div>
      </div>
    </div>
  )
}

export default GroupHeader
