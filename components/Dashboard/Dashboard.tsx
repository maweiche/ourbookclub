// /src/components/Dashboard/Dashboard.tsx
'use client'

import { useEffect } from 'react'
import { useUserStore } from '@/lib/stores/userStore'
import { useGroupStore } from '@/lib/stores/groupStore'
import GroupOverview from './GroupOverview'
import ReadingProgressCard from './ReadingProgressCard'
import UpcomingMeetings from './UpcomingMeetings'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
} from '@/components/ui/page-header'
import { Separator } from '@/components/ui/separator'
import { LayoutDashboard } from 'lucide-react'

const Dashboard = () => {
  const { currentUser } = useUserStore()
  const { fetchGroups } = useGroupStore()

  useEffect(() => {
    if (currentUser) {
      fetchGroups(currentUser.groupIds)
    }
  }, [currentUser])

  return (
    <div className="space-y-6">
      <PageHeader>
        <PageHeaderHeading className="flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6" />
          Dashboard
        </PageHeaderHeading>
        <PageHeaderDescription>
          Welcome back, {currentUser?.name}
        </PageHeaderDescription>
      </PageHeader>

      <Separator />

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <GroupOverview />
            <ReadingProgressCard />
            <UpcomingMeetings />
          </div>
        </TabsContent>

        <TabsContent value="activity">
          {/* Future activity feed content */}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Dashboard
