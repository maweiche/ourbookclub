// /src/components/Book/BookRating.tsx
'use client'
import { useState } from 'react'
import { useBookStore } from '@/lib/stores/bookStore'
import { useUserStore } from '@/lib/stores/userStore'

const BookRating = () => {
  const { currentBook, addRating } = useBookStore()
  const currentUser = useUserStore((state) => state.currentUser)
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')

  const handleSubmitRating = () => {
    if (!currentBook || !currentUser || rating === 0) return

    addRating(currentBook.id, currentUser.id, rating, review)
    setRating(0)
    setReview('')
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">Rate this Book</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rating
          </label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300"
          >
            <option value={0}>Select rating</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} stars
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Review (optional)
          </label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300"
            placeholder="Share your thoughts about the book..."
          />
        </div>

        <button
          onClick={handleSubmitRating}
          disabled={rating === 0}
          className="rounded-md bg-blue-500 px-4 py-2 text-white disabled:bg-gray-300"
        >
          Submit Rating
        </button>
      </div>
    </div>
  )
}

export default BookRating
