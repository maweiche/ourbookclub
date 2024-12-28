// /src/components/Group/Admin/GroupAdminPanel.tsx
'use client'

import { useState } from 'react'
import { useGroupStore } from '@/lib/stores/groupStore'
import { useUserStore } from '@/lib/stores/userStore'
import { Group, User } from '@/lib/types'
import MemberManagement from './MemberManagement'
import GroupSettings from './GroupSettings'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Settings, Users, AlertTriangle } from 'lucide-react'
import { useParams } from 'next/navigation'

const GroupAdminPanel = () => {
  const params = useParams()
  const groupId = params.groupId as string
  const group = useGroupStore((state) => state.groups.get(groupId))
  const currentUser = useUserStore((state) => state.currentUser)
  const [activeTab, setActiveTab] = useState('members')

  if (!group || !currentUser || !group.adminIds.includes(currentUser.id)) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Access Denied</AlertTitle>
        <AlertDescription>
          You don't have permission to access this page.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Card className="mx-auto max-w-4xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Group Administration
        </CardTitle>
        <CardDescription>
          Manage members and settings for {group.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="members"
          className="space-y-6"
          onValueChange={(value) => setActiveTab(value)}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="members" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Members
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="space-y-4">
            <MemberManagement group={group} /> {/* Pass the group as prop */}
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <GroupSettings />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default GroupAdminPanel
