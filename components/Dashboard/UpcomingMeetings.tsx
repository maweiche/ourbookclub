// src/components/Dashboard/UpcomingMeetings.tsx
'use client'

import { useGroupStore } from '@/lib/stores/groupStore'
import { useUserStore } from '@/lib/stores/userStore'

const UpcomingMeetings = () => {
  const activeGroupId = useUserStore(state => state.activeGroupId)
  const currentGroup = useGroupStore(state => 
    state.groups.get(activeGroupId || '')
  )

  const upcomingMeetings = currentGroup?.meetingSchedule
    .filter(meeting => new Date(meeting.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3) || []

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Upcoming Meetings</h2>
      {upcomingMeetings.length > 0 ? (
        <div className="space-y-4">
          {upcomingMeetings.map(meeting => (
            <div key={meeting.id} className="border rounded-md p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{meeting.description}</h3>
                  <p className="text-sm text-gray-600">{meeting.location}</p>
                </div>
                <time className="text-sm text-gray-500">
                  {new Date(meeting.date).toLocaleDateString(undefined, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit'
                  })}
                </time>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                {meeting.attendees.length} attending
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No upcoming meetings</p>
      )}
    </div>
  )
}

export default UpcomingMeetings