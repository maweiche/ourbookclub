// /src/components/Layout/Navbar.tsx
'use client'
import { useUserStore } from '../../lib/stores/userStore'
import { useGroupStore } from '../../lib/stores/groupStore'

const Navbar = () => {
  const { currentUser, activeGroupId, logout } = useUserStore()
  const { groups } = useGroupStore()

  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">BookClub</h1>
            {currentUser && (
              <select
                className="ml-4 rounded-md border-gray-300"
                value={activeGroupId || ''}
                onChange={(e) =>
                  useUserStore.getState().setActiveGroup(e.target.value)
                }
              >
                {Array.from(groups.values()).map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {currentUser ? (
            <div className="flex items-center">
              <span className="mr-4">{currentUser.name}</span>
              <button
                onClick={logout}
                className="rounded-md bg-red-500 px-4 py-2 text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <button className="rounded-md bg-blue-500 px-4 py-2 text-white">
              Login with Google
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
