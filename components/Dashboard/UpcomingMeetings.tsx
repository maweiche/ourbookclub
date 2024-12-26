// /src/components/Dashboard/UpcomingMeetings.tsx
import { useGroupStore } from '@/lib/stores/groupStore'

const UpcomingMeetings = () => {
  const currentGroup = useGroupStore((state) => state.currentGroup)

  const upcomingMeetings = currentGroup?.meetingSchedule
    .filter((meeting) => new Date(meeting.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3)

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">Upcoming Meetings</h2>
      {upcomingMeetings?.length ? (
        <div className="space-y-4">
          {upcomingMeetings.map((meeting) => (
            <div key={meeting.id} className="rounded-md border p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{meeting.description}</h3>
                  <p className="text-sm text-gray-600">{meeting.location}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(meeting.date).toLocaleDateString()}
                </div>
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
