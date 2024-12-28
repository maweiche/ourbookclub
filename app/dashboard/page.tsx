// src/app/dashboard/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/lib/stores/userStore'
import { useGroupStore } from '@/lib/stores/groupStore'
import Dashboard from '@/components/Dashboard/Dashboard'

export default function DashboardPage() {
  const router = useRouter()
  const { currentUser, isAuthenticated } = useUserStore()
  const { groups } = useGroupStore()

  // useEffect(() => {
  //   // If not authenticated, redirect to home page
  //   if (!isAuthenticated) {
  //     router.push('/')
  //   }
  // }, [isAuthenticated, router])

  // Show loading state while checking authentication
  if (!isAuthenticated) {
    return null
  }

  return <Dashboard />
}