// /src/components/Layout/Sidebar.tsx
'use client'
import { useUserStore } from '@/lib/stores/userStore'
import { useGroupStore } from '@/lib/stores/groupStore'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  LayoutDashboard,
  Home,
  Library,
  Calendar,
  Users,
  Settings,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const Sidebar = () => {
  const activeGroupId = useUserStore((state) => state.activeGroupId)
  const currentGroup = useGroupStore((state) => state.currentGroup)
  const pathname = usePathname()

  const routes = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      showAlways: true,
    },
    {
      href: `/groups/${activeGroupId}`,
      label: 'Group Home',
      icon: Home,
      requiresGroup: true,
    },
    {
      href: `/groups/${activeGroupId}/books`,
      label: 'Book Selection',
      icon: Library,
      requiresGroup: true,
    },
    {
      href: `/groups/${activeGroupId}/calendar`,
      label: 'Calendar',
      icon: Calendar,
      requiresGroup: true,
    },
  ]

  return (
    <div className="h-full w-64 border-r bg-background">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            {currentGroup?.name || 'Select a group'}
          </h2>
          <Separator className="mb-4" />
        </div>
        <ScrollArea className="px-1">
          <div className="space-y-1 p-2">
            {routes.map((route) => {
              if (!activeGroupId && route.requiresGroup) return null

              const Icon = route.icon
              const isActive = pathname === route.href

              return (
                <Button
                  key={route.href}
                  asChild
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start',
                    isActive && 'bg-accent'
                  )}
                >
                  <Link href={route.href}>
                    <Icon className="mr-2 h-4 w-4" />
                    {route.label}
                  </Link>
                </Button>
              )
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default Sidebar
