// /src/components/Dashboard/GroupOverview.tsx
import { useGroupStore } from '@/lib/stores/groupStore'
import { useUserStore } from '@/lib/stores/userStore'

const GroupOverview = () => {
  const groups = useGroupStore((state) => state.groups)
  const setActiveGroup = useUserStore((state) => state.setActiveGroup)

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">Your Groups</h2>
      <div className="space-y-4">
        {Array.from(groups.values()).map((group) => (
          <div
            key={group.id}
            className="cursor-pointer rounded-md border p-4 hover:border-blue-500"
            onClick={() => setActiveGroup(group.id)}
          >
            <h3 className="font-medium">{group.name}</h3>
            <p className="text-sm text-gray-600">{group.description}</p>
            <div className="mt-2 text-sm text-gray-500">
              {group.memberIds.length} members
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GroupOverview
