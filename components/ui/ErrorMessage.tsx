// src/components/ui/ErrorMessage.tsx
interface ErrorMessageProps {
    message?: string
    onRetry?: () => void
  }
  
  export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-4">{message || 'An error occurred'}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Try again
          </button>
        )}
      </div>
    )
  }