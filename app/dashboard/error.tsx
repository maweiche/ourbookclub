
  // src/app/dashboard/error.tsx
  'use client'
  
  import { useEffect } from 'react'
  
  export default function DashboardError({
    error,
    reset,
  }: {
    error: Error & { digest?: string }
    reset: () => void
  }) {
    useEffect(() => {
      // Log the error to an error reporting service
      console.error(error)
    }, [error])
  
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Something went wrong!
          </h2>
          <p className="text-gray-600 mb-4">
            {error.message || 'An error occurred while loading the dashboard'}
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
  