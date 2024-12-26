// /src/components/Group/CurrentBook.tsx
'use client'
import { useEffect } from 'react'
import { useGroupStore } from '@/lib/stores/groupStore'
import { useBookStore } from '@/lib/stores/bookStore'

const CurrentBook = () => {
  const currentGroup = useGroupStore((state) => state.currentGroup)
  const { books, fetchBooks } = useBookStore()

  useEffect(() => {
    if (currentGroup?.currentBookId) {
      fetchBooks([currentGroup.currentBookId])
    }
  }, [currentGroup])

  const currentBook = currentGroup?.currentBookId
    ? books.get(currentGroup.currentBookId)
    : null

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">Current Book</h2>
      {currentBook ? (
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
                  {currentBook.ratings.length > 0
                    ? (
                        currentBook.ratings.reduce(
                          (acc, r) => acc + r.rating,
                          0
                        ) / currentBook.ratings.length
                      ).toFixed(1)
                    : 'No ratings yet'}
                </span>
              </div>
              <div>
                <h4 className="mb-2 font-medium">Recent Reviews</h4>
                {currentBook.ratings
                  .filter((r) => r.review)
                  .slice(0, 3)
                  .map((rating) => (
                    <div
                      key={rating.userId}
                      className="mb-2 text-sm text-gray-600"
                    >
                      {rating.review}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No book currently selected</p>
      )}
    </div>
  )
}

export default CurrentBook
