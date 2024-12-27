// src/components/Layout/Navbar.tsx
'use client'

import { useUserStore } from '@/lib/stores/userStore'
import { useGroupStore } from '@/lib/stores/groupStore'

const Navbar = () => {
  const { currentUser, activeGroupId, logout } = useUserStore()
  const { groups, isLoading } = useGroupStore()

  console.log('Navbar State:', {
    groups: Array.from(groups.values()),
    activeGroupId,
    currentUser
  })

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">BookClub</h1>
            {currentUser && (
              <select 
                className="ml-4 rounded-md border-gray-300"
                value={activeGroupId || ''}
                onChange={(e) => useUserStore.getState().setActiveGroup(e.target.value)}
                disabled={isLoading}
              >
                {Array.from(groups.values()).map(group => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          
          <div className="flex items-center">
            {currentUser && (
              <>
                <span className="mr-4">{currentUser.name}</span>
                <button 
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar