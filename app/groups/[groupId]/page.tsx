// src/app/groups/[groupId]/page.tsx
import GroupHeader from '@/components/Group/GroupHeader'
import CurrentBook from '@/components/Group/CurrentBook'

export default function GroupPage() {

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <GroupHeader />
      <CurrentBook />
    </div>
  )
}
