// src/components/ui/ErrorMessage.tsx
interface ErrorMessageProps {
  message?: string
  onRetry?: () => void
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="rounded-lg bg-white p-6 text-center shadow">
      <h2 className="mb-4 text-2xl font-semibold text-gray-900">
        Something went wrong
      </h2>
      <p className="mb-4 text-gray-600">{message || 'An error occurred'}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Try again
        </button>
      )}
    </div>
  )
}
