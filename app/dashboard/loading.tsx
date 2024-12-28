// src/app/dashboard/loading.tsx
export default function DashboardLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse rounded-lg bg-white p-6 shadow">
            <div className="mb-4 h-4 w-3/4 rounded bg-gray-200"></div>
            <div className="space-y-3">
              <div className="h-3 rounded bg-gray-200"></div>
              <div className="h-3 w-5/6 rounded bg-gray-200"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
