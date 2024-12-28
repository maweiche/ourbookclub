// src/app/groups/[groupId]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useGroupStore } from '@/lib/stores/groupStore'
import { useUserStore } from '@/lib/stores/userStore'
import GroupHeader from '@/components/Group/GroupHeader'
import CurrentBook from '@/components/Group/CurrentBook'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import ErrorMessage from '@/components/ui/ErrorMessage'
import BookList from '@/components/Group/BookList'

export default function GroupPage() {
  const params = useParams()
  const groupId = params.groupId as string
  const { groups, isLoading, error, fetchGroups } = useGroupStore()
  const currentUser = useUserStore((state) => state.currentUser)
  const [initialLoadComplete, setInitialLoadComplete] = useState(false)

  useEffect(() => {
    const initializeGroup = async () => {
      if (currentUser && groupId) {
        await fetchGroups([groupId])
      }
      setInitialLoadComplete(true)
    }

    initializeGroup()
  }, [groupId, currentUser])

  // Show loading spinner during initial load or while fetching group data
  if (!initialLoadComplete || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    )
  }

  // Only show error after initial load is complete and there's an actual error
  if (initialLoadComplete && error) {
    return <ErrorMessage message={error} />
  }

  const group = groups.get(groupId)
  if (initialLoadComplete && !group) {
    return <ErrorMessage message="Group not found" />
  }

  // Only render the group page when we have the group data
  if (!group) {
    return null
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <GroupHeader group={group} />
      <div className="mt-6">
        <BookList />
      </div>
    </div>
  )
}