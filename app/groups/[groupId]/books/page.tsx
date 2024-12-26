// src/app/groups/[groupId]/books/page.tsx
import BookSelection from '@/components/Book/BookSelection'

export default function BookSelectionPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <BookSelection />
    </div>
  )
}
