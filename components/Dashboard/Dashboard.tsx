// /src/components/Dashboard/Dashboard.tsx
'use client'
import { useEffect } from 'react'
import { useUserStore } from '../../lib/stores/userStore'
import { useGroupStore } from '../../lib/stores/groupStore'
import GroupOverview from './GroupOverview'
import ReadingProgressCard from './ReadingProgressCard'
import UpcomingMeetings from './UpcomingMeetings'

const Dashboard = () => {
  const { currentUser } = useUserStore()
  const { fetchGroups } = useGroupStore()

  useEffect(() => {
    if (currentUser) {
      fetchGroups(currentUser.groupIds)
    }
  }, [currentUser])

  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <GroupOverview />
        <ReadingProgressCard />
        <UpcomingMeetings />
      </div>
    </div>
  )
}

export default Dashboard
