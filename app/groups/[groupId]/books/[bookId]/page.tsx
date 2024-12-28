// src/app/groups/[groupId]/books/[bookId]/page.tsx
'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useBookStore } from '@/lib/stores/bookStore'
import BookDiscussion from '@/components/Book/BookDiscussion'

export default function BookDiscussionPage() {
  const params = useParams()
  const { fetchBooks, setCurrentBook } = useBookStore()

  useEffect(() => {
    const initializeBook = async () => {
      if (params.bookId) {
        await fetchBooks([params.bookId as string])
        setCurrentBook(params.bookId as string)
      }
    }

    initializeBook()
  }, [params.bookId, fetchBooks, setCurrentBook])

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <BookDiscussion />
    </div>
  )
}
