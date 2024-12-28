// src/app/groups/[groupId]/books/[bookId]/error.tsx
'use client'

export default function BookError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="rounded-lg bg-white p-6 text-center shadow">
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">
          Error Loading Book
        </h2>
        <p className="mb-4 text-gray-600">
          {error.message || 'An error occurred while loading the book details'}
        </p>
        <button
          onClick={reset}
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
