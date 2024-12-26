// /src/components/Book/BookSelection.tsx
'use client'
import { useEffect } from 'react'
import { useGroupStore } from '@/lib/stores/groupStore'
import { useBookStore } from '@/lib/stores/bookStore'
import { useUserStore } from '@/lib/stores/userStore'

const BookSelection = () => {
  const currentGroup = useGroupStore((state) => state.currentGroup)
  const { books, fetchBooks, addVote } = useBookStore()
  const currentUser = useUserStore((state) => state.currentUser)

  useEffect(() => {
    if (currentGroup?.suggestedBooks) {
      fetchBooks(currentGroup.suggestedBooks)
    }
  }, [currentGroup])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Book Selection</h2>
        <button className="rounded-md bg-blue-500 px-4 py-2 text-white">
          Suggest a Book
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from(books.values()).map((book) => (
          <div key={book.id} className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-start space-x-4">
              <img
                src={book.coverImage}
                alt={book.title}
                className="h-36 w-24 rounded object-cover"
              />
              <div>
                <h3 className="font-medium">{book.title}</h3>
                <p className="text-sm text-gray-600">{book.author}</p>
                <div className="mt-4">
                  <span className="text-sm text-gray-600">
                    {book.votes.length} votes
                  </span>
                  {currentUser && (
                    <button
                      onClick={() => addVote(book.id, currentUser.id, 1)}
                      className="ml-4 text-sm text-blue-500 hover:text-blue-600"
                    >
                      Vote
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BookSelection
