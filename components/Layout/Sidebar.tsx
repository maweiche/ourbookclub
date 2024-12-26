// /src/components/Layout/Sidebar.tsx
import { useUserStore } from '../../lib/stores/userStore'
import { useGroupStore } from '../../lib/stores/groupStore'

const Sidebar = () => {
  const activeGroupId = useUserStore((state) => state.activeGroupId)
  const currentGroup = useGroupStore((state) => state.currentGroup)

  return (
    <div className="h-screen w-64 bg-white shadow-sm">
      <div className="p-4">
        <h2 className="mb-4 text-lg font-semibold">
          {currentGroup?.name || 'Select a group'}
        </h2>
        <nav className="space-y-2">
          <a href="/dashboard" className="block rounded p-2 hover:bg-gray-100">
            Dashboard
          </a>
          {activeGroupId && (
            <>
              <a
                href={`/groups/${activeGroupId}`}
                className="block rounded p-2 hover:bg-gray-100"
              >
                Group Home
              </a>
              <a
                href={`/groups/${activeGroupId}/books`}
                className="block rounded p-2 hover:bg-gray-100"
              >
                Book Selection
              </a>
              <a
                href={`/groups/${activeGroupId}/calendar`}
                className="block rounded p-2 hover:bg-gray-100"
              >
                Calendar
              </a>
            </>
          )}
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
