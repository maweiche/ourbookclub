// /src/components/Group/GroupHeader.tsx
'use client'
import { useRouter } from 'next/navigation'
import { Group } from '@/lib/types'
import { useUserStore } from '@/lib/stores/userStore'
import { useGroupStore } from '@/lib/stores/groupStore'
import BookTitle from '@/components/Book/BookTitle'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface GroupHeaderProps {
  group: Group
}

const GroupHeader = ({ group }: GroupHeaderProps) => {
  const router = useRouter()
  const currentUser = useUserStore((state) => state.currentUser)
  const currentGroup = useGroupStore((state) => state.currentGroup)
  const isAdmin = group.adminIds.includes(currentUser?.id || '')

  const handleManageGroup = () => {
    router.push(`/groups/${group.id}/admin`)
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">{group.name}</h1>
            <p className="text-sm text-muted-foreground">{group.description}</p>
          </div>
          {isAdmin && (
            <Button onClick={handleManageGroup} variant="default" size="sm">
              Manage Group
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="px-4 py-1">
            <span className="mr-1 font-medium">{group.memberIds.length}</span>
            members
          </Badge>
          <Badge variant="secondary" className="px-4 py-1">
            <span className="mr-1 font-medium">
              {group.readingHistory.length}
            </span>
            books read
          </Badge>
          {group.currentBookId && (
            <>
              <Separator orientation="vertical" className="h-4" />
              <div className="text-sm text-muted-foreground">
                <BookTitle bookId={group.currentBookId} />
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default GroupHeader
