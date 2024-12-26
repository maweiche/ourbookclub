// components/Layout/AuthCheck.tsx
'use client'

import { useUserStore } from '@/lib/stores/userStore'

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated)

  if (!isAuthenticated) {
    return null
  }

  return children
}