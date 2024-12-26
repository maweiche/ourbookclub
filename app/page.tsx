// src/app/page.tsx (Landing page)
export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Welcome to BookClub
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Join a community of readers, share your thoughts, and discover your
          next favorite book.
        </p>
        <div className="mt-10">
          <button className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white">
            Get Started
          </button>
        </div>
      </div>
    </main>
  )
}
