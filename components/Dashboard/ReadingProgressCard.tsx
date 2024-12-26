// /src/components/Dashboard/ReadingProgressCard.tsx
import { useEffect } from 'react'
import { useGroupStore } from '@/lib/stores/groupStore'
import { useBookStore } from '@/lib/stores/bookStore'
import { useUserStore } from '@/lib/stores/userStore'

const ReadingProgressCard = () => {
  const currentGroup = useGroupStore((state) => state.currentGroup)
  const { books, fetchBooks } = useBookStore()
  const currentUser = useUserStore((state) => state.currentUser)

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
      <h2 className="mb-4 text-xl font-semibold">Current Reading</h2>
      {currentBook ? (
        <div>
          <div className="flex items-start space-x-4">
            <img
              src={currentBook.coverImage}
              alt={currentBook.title}
              className="h-36 w-24 rounded object-cover"
            />
            <div>
              <h3 className="font-medium">{currentBook.title}</h3>
              <p className="text-sm text-gray-600">{currentBook.author}</p>
              <div className="mt-4">
                <div className="h-2.5 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2.5 rounded-full bg-blue-600"
                    style={{ width: '45%' }} // This would come from reading progress
                  />
                </div>
                <span className="mt-1 text-sm text-gray-600">
                  Page 150 of {currentBook.totalPages}
                </span>
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

export default ReadingProgressCard
