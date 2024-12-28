// /src/components/Group/CurrentBook.tsx
'use client'

import { useEffect } from 'react'
import { Group } from '@/lib/types'
import { useBookStore } from '@/lib/stores/bookStore'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

interface CurrentBookProps {
  group: Group
}

const CurrentBook = ({ group }: CurrentBookProps) => {
  const { books, fetchBooks, isLoading } = useBookStore()

  useEffect(() => {
    if (group.currentBookId) {
      fetchBooks([group.currentBookId])
    }
  }, [group.currentBookId])

  if (isLoading) {
    return (
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">Current Book</h2>
        <LoadingSpinner />
      </div>
    )
  }

  const currentBook = group.currentBookId ? books.get(group.currentBookId) : null

  if (!currentBook) {
    return (
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">Current Book</h2>
        <p className="text-gray-500">No book currently selected</p>
      </div>
    )
  }

  const averageRating = currentBook.ratings.length > 0
    ? (currentBook.ratings.reduce((acc, r) => acc + r.rating, 0) / currentBook.ratings.length).toFixed(1)
    : null

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">Current Book</h2>
      <div className="flex items-start space-x-6">
        <img
          src={currentBook.coverImage}
          alt={currentBook.title}
          className="h-48 w-32 rounded object-cover"
        />
        <div>
          <h3 className="text-lg font-medium">{currentBook.title}</h3>
          <p className="text-gray-600">{currentBook.author}</p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <span className="text-gray-500">Average Rating:</span>
              <span className="ml-2 font-medium">
                {averageRating ? `${averageRating}/5` : 'No ratings yet'}
              </span>
            </div>
            {currentBook.ratings.length > 0 && (
              <div>
                <h4 className="mb-2 font-medium">Recent Reviews</h4>
                <div className="space-y-3">
                  {currentBook.ratings
                    .filter((r) => r.review)
                    .slice(0, 3)
                    .map((rating) => (
                      <div
                        key={`${rating.userId}-${rating.rating}`}
                        className="rounded-md bg-gray-50 p-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Rating: {rating.rating}/5</span>
                        </div>
                        {rating.review && (
                          <p className="mt-1 text-sm text-gray-600">{rating.review}</p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentBook