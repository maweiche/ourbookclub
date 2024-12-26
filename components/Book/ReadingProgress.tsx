// /src/components/Book/ReadingProgress.tsx
'use client'
import { useState } from 'react'
import { useBookStore } from '@/lib/stores/bookStore'
import { useUserStore } from '@/lib/stores/userStore'

const ReadingProgress = () => {
  const { currentBook } = useBookStore()
  const currentUser = useUserStore((state) => state.currentUser)
  const [currentPage, setCurrentPage] = useState(0)

  const progressPercentage = currentBook
    ? (currentPage / currentBook.totalPages) * 100
    : 0

  const handleUpdateProgress = () => {
    // In a real app, we'd update this in the backend
    console.log(`Updated progress: ${currentPage} pages`)
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">Reading Progress</h2>

      {currentBook && (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <input
              type="number"
              min={0}
              max={currentBook.totalPages}
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
              className="w-24 rounded-md border-gray-300"
            />
            <span className="text-gray-600">
              of {currentBook.totalPages} pages
            </span>
            <button
              onClick={handleUpdateProgress}
              className="rounded-md bg-blue-500 px-4 py-2 text-white"
            >
              Update
            </button>
          </div>

          <div className="h-2.5 w-full rounded-full bg-gray-200">
            <div
              className="h-2.5 rounded-full bg-blue-600"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ReadingProgress
