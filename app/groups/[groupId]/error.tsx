// src/app/groups/[groupId]/error.tsx
'use client'
  
export default function GroupError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Error Loading Group
        </h2>
        <p className="text-gray-600 mb-4">
          {error.message || 'An error occurred while loading the group'}
        </p>
        <button
          onClick={reset}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Try again
        </button>
      </div>
    </div>
  )
}

