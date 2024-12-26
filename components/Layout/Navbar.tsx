// src/components/Layout/Navbar.tsx
'use client'

import { useUserStore } from '@/lib/stores/userStore'
import { useGroupStore } from '@/lib/stores/groupStore'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

const Navbar = () => {
  const { 
    currentUser, 
    activeGroupId, 
    isLoading, 
    error,
    login, 
    logout 
  } = useUserStore()
  const { groups } = useGroupStore()

  const handleLogin = async () => {
    await login()
  }

  const handleLogout = async () => {
    await logout()
  }

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
            {isLoading ? (
              <LoadingSpinner />
            ) : currentUser ? (
              <>
                <span className="mr-4">{currentUser.name}</span>
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  disabled={isLoading}
                >
                  Logout
                </button>
              </>
            ) : (
              <button 
                onClick={handleLogin}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                disabled={isLoading}
              >
                Login with Google
              </button>
            )}
          </div>
        </div>
      </div>
      {error && (
        <div className="bg-red-50 text-red-500 text-sm py-2 px-4">
          {error}
        </div>
      )}
    </nav>
  )
}

export default Navbar