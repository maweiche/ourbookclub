// src/app/groups/[groupId]/loading.tsx
export default function GroupLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 animate-pulse rounded-lg bg-white p-6 shadow">
        <div className="mb-4 h-8 w-1/3 rounded bg-gray-200"></div>
        <div className="h-4 w-2/3 rounded bg-gray-200"></div>
      </div>
      <div className="animate-pulse rounded-lg bg-white p-6 shadow">
        <div className="flex space-x-4">
          <div className="h-48 w-32 rounded bg-gray-200"></div>
          <div className="flex-1 space-y-4">
            <div className="h-6 w-3/4 rounded bg-gray-200"></div>
            <div className="h-4 w-1/2 rounded bg-gray-200"></div>
            <div className="space-y-2">
              <div className="h-3 rounded bg-gray-200"></div>
              <div className="h-3 w-5/6 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
