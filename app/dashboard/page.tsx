// src/app/dashboard/page.tsx
'use client'

import { useEffect } from 'react'
import { useUserStore } from '@/lib/stores/userStore'
import { useGroupStore } from '@/lib/stores/groupStore'
import Dashboard from '@/components/Dashboard/Dashboard'

export default function DashboardPage() {
  const { currentUser, isAuthenticated, login } = useUserStore()
  const { groups } = useGroupStore()

  useEffect(() => {
    // If no user is authenticated, try to login
    if (!isAuthenticated) {
      login()
    }
    
    console.log('Dashboard State:', { 
      currentUser, 
      isAuthenticated,
      groupsSize: groups.size 
    })
  }, [isAuthenticated, currentUser, groups])

  if (!isAuthenticated) {
    return <div>Loading...</div>
  }

  return <Dashboard />
}