// src/components/ui/LoadingSpinner.tsx
export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
    </div>
  )
}
