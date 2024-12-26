// src/app/groups/[groupId]/calendar/page.tsx
import UpcomingMeetings from '@/components/Dashboard/UpcomingMeetings'

export default function CalendarPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold">Calendar</h1>
      <UpcomingMeetings />
    </div>
  )
}
