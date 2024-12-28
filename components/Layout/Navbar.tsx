// src/components/Layout/Navbar.tsx
'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useUserStore } from '@/lib/stores/userStore'
import { useGroupStore } from '@/lib/stores/groupStore'

const Navbar = () => {
  const { currentUser, activeGroupId, logout, isAuthenticated, login } = useUserStore()
  const { groups, isLoading, fetchGroups } = useGroupStore()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isAuthenticated) {
      login()
    }
  }, [isAuthenticated])

  useEffect(() => {
    const fetchUserGroups = async () => {
      if (currentUser && currentUser?.groupIds?.length > 0) {
        console.log('Fetching groups for IDs:', currentUser.groupIds)
        await fetchGroups(currentUser.groupIds)
      }
    }
    
    fetchUserGroups()
  }, [currentUser])

  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newGroupId = e.target.value
    useUserStore.getState().setActiveGroup(newGroupId)

    // If we're on a group-specific page, navigate to the new group
    if (pathname.startsWith('/groups/')) {
      router.push(`/groups/${newGroupId}`)
    }
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">BookClub</h1>
            {currentUser && groups.size > 0 && (
              <select 
                className="ml-4 rounded-md border-gray-300"
                value={activeGroupId || ''}
                onChange={handleGroupChange}
                disabled={isLoading}
              >
                <option value="" disabled>Select a group</option>
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
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
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