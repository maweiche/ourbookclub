// src/app/groups/[groupId]/admin/page.tsx
'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useGroupStore } from '@/lib/stores/groupStore'
import GroupAdminPanel from '@/components/Group/Admin/GroupAdminPanel'
import LoadingSpinner from '@/components/ui/loading-spinner'

export default function AdminPage() {
  const params = useParams()
  const groupId = params.groupId as string
  const [isLoading, setIsLoading] = useState(true)
  const { fetchGroups } = useGroupStore()

  useEffect(() => {
    const loadGroup = async () => {
      if (groupId) {
        setIsLoading(true)
        console.log('Fetching group:', groupId)
        await fetchGroups([groupId])
        setIsLoading(false)
      }
    }

    loadGroup()
  }, [groupId, fetchGroups])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <GroupAdminPanel />
    </div>
  )
}
