// src/components/Dashboard/GroupOverview.tsx
'use client'

import { useGroupStore } from '@/lib/stores/groupStore'
import { useUserStore } from '@/lib/stores/userStore'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Users, BookOpen, ShieldCheck, AlertCircle } from 'lucide-react'

const GroupOverview = () => {
  const { groups, isLoading, error } = useGroupStore()
  const { activeGroupId, setActiveGroup } = useUserStore()

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Groups</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-[100px] w-full" />
          <Skeleton className="h-[100px] w-full" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Groups</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Your Groups
        </CardTitle>
      </CardHeader>
      <CardContent>
        {groups.size === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Users className="mb-2 h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No groups found</p>
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {Array.from(groups.values()).map((group, index) => (
                <div key={group.id}>
                  <Button
                    variant={
                      activeGroupId === group.id ? 'secondary' : 'outline'
                    }
                    className="flex h-auto w-full flex-col items-start space-y-2 p-4"
                    onClick={() => setActiveGroup(group.id)}
                  >
                    <div className="flex w-full items-center justify-between">
                      <h3 className="text-left font-medium">{group.name}</h3>
                      {group.adminIds.includes('u1') && (
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          <ShieldCheck className="h-3 w-3" />
                          Admin
                        </Badge>
                      )}
                    </div>
                    <p className="text-left text-sm text-muted-foreground">
                      {group.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {group.memberIds.length} members
                      </span>
                      {group.currentBookId && (
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          Current book
                        </span>
                      )}
                    </div>
                  </Button>
                  {index < groups.size - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}

export default GroupOverview
