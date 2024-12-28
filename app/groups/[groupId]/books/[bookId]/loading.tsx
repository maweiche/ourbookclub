// src/app/groups/[groupId]/books/[bookId]/loading.tsx
export default function BookLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="animate-pulse rounded-lg bg-white p-6 shadow">
            <div className="space-y-4">
              <div className="h-6 w-1/4 rounded bg-gray-200"></div>
              <div className="space-y-2">
                <div className="h-4 rounded bg-gray-200"></div>
                <div className="h-4 w-5/6 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="animate-pulse rounded-lg bg-white p-6 shadow">
            <div className="mb-4 h-4 w-1/2 rounded bg-gray-200"></div>
            <div className="h-2 w-full rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
