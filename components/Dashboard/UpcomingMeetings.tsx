// src/components/Dashboard/UpcomingMeetings.tsx
'use client'

import { useGroupStore } from '@/lib/stores/groupStore'
import { useUserStore } from '@/lib/stores/userStore'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CalendarDays, MapPin, Users, Calendar } from 'lucide-react'

const UpcomingMeetings = () => {
  const activeGroupId = useUserStore((state) => state.activeGroupId)
  const currentGroup = useGroupStore((state) =>
    state.groups.get(activeGroupId || '')
  )

  const upcomingMeetings =
    currentGroup?.meetingSchedule
      .filter((meeting) => new Date(meeting.date) > new Date())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 3) || []

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming Meetings
        </CardTitle>
      </CardHeader>
      <CardContent>
        {upcomingMeetings.length > 0 ? (
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {upcomingMeetings.map((meeting, index) => (
                <div key={meeting.id}>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-medium leading-none">
                          {meeting.description}
                        </h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-1 h-4 w-4" />
                          {meeting.location}
                        </div>
                      </div>
                      <Badge variant="outline" className="flex items-center">
                        <CalendarDays className="mr-1 h-3 w-3" />
                        <time>
                          {new Date(meeting.date).toLocaleDateString(
                            undefined,
                            {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit',
                            }
                          )}
                        </time>
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="mr-1 h-4 w-4" />
                      <span>{meeting.attendees.length} attending</span>
                    </div>
                  </div>
                  {index < upcomingMeetings.length - 1 && (
                    <Separator className="my-4" />
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Calendar className="mb-2 h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No upcoming meetings
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default UpcomingMeetings
