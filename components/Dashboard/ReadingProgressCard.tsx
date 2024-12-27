// src/components/Dashboard/ReadingProgressCard.tsx
'use client'

import { useEffect } from 'react'
import { useGroupStore } from '@/lib/stores/groupStore'
import { useBookStore } from '@/lib/stores/bookStore'
import { useUserStore } from '@/lib/stores/userStore'

const ReadingProgressCard = () => {
  const activeGroupId = useUserStore(state => state.activeGroupId)
  const activeGroup = useGroupStore(state => 
    activeGroupId ? state.groups.get(activeGroupId) : null
  )
  const { books, fetchBooks, isLoading } = useBookStore()

  useEffect(() => {
    const fetchCurrentBook = async () => {
      if (activeGroup?.currentBookId) {
        console.log('Fetching book:', activeGroup.currentBookId)
        await fetchBooks([activeGroup.currentBookId])
      }
    }
    
    fetchCurrentBook()
  }, [activeGroup?.currentBookId, fetchBooks])

  const currentBook = activeGroup?.currentBookId 
    ? books.get(activeGroup.currentBookId)
    : null

  console.log('Current reading state:', {
    activeGroupId,
    currentBookId: activeGroup?.currentBookId,
    currentBook,
    allBooks: Array.from(books.entries())
  })

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Current Reading</h2>
        <div className="animate-pulse flex space-x-4">
          <div className="w-24 h-36 bg-gray-200 rounded"></div>
          <div className="flex-1 space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Current Reading</h2>
      {currentBook ? (
        <div className="flex items-start space-x-4">
          <img 
            src={currentBook.coverImage} 
            alt={currentBook.title}
            className="w-24 h-36 object-cover rounded"
          />
          <div>
            <h3 className="font-medium">{currentBook.title}</h3>
            <p className="text-sm text-gray-600">{currentBook.author}</p>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: '45%' }}
                />
              </div>
              <span className="text-sm text-gray-600 mt-1">
                Page 150 of {currentBook.totalPages}
              </span>
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