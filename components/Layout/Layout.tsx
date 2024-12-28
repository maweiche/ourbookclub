// components/Layout/Layout.tsx
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import AuthCheck from './AuthCheck'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <AuthCheck>
          <Sidebar />
        </AuthCheck>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
