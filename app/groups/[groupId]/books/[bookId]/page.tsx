// src/app/groups/[groupId]/books/[bookId]/page.tsx
import BookDiscussion from '@/components/Book/BookDiscussion'
import ReadingProgress from '@/components/Book/ReadingProgress'
import BookRating from '@/components/Book/BookRating'

export default function BookPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BookDiscussion />
        </div>
        <div className="space-y-6">
          <ReadingProgress />
          <BookRating />
        </div>
      </div>
    </div>
  )
}
