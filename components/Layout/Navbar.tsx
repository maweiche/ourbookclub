// /src/components/Layout/Navbar.tsx
'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useUserStore } from '@/lib/stores/userStore'
import { useGroupStore } from '@/lib/stores/groupStore'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { LogOut, LogIn, Menu, User } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

const Navbar = () => {
  const { currentUser, activeGroupId, logout, isAuthenticated, login } =
    useUserStore()
  const { groups, isLoading, fetchGroups } = useGroupStore()
  const router = useRouter()
  const pathname = usePathname()

  async function handleLogout() {
    await logout()
    router.push('/')
  }

  useEffect(() => {
    const fetchUserGroups = async () => {
      if (currentUser && currentUser?.groupIds?.length > 0) {
        console.log('Fetching groups for IDs:', currentUser.groupIds)
        await fetchGroups(currentUser.groupIds)
      }
    }

    fetchUserGroups()
  }, [currentUser])

  const handleGroupChange = (newGroupId: string) => {
    useUserStore.getState().setActiveGroup(newGroupId)

    // If we're on a group-specific page, navigate to the new group
    if (pathname.startsWith('/groups/')) {
      router.push(`/groups/${newGroupId}`)
    }
  }

  return (
    <nav className="border-b bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">BookClub</h1>
            {currentUser && groups.size > 0 && (
              <Select
                value={activeGroupId || ''}
                onValueChange={handleGroupChange}
                disabled={isLoading}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select a group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Your Groups</SelectLabel>
                    {Array.from(groups.values()).map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={currentUser.profilePicture}
                      alt={currentUser.name}
                    />
                    <AvatarFallback>
                      {currentUser.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden font-medium md:inline-block">
                    {currentUser.name}
                  </span>
                </div>
                <Button variant="destructive" onClick={handleLogout} size="sm">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Button onClick={login} size="sm">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            )}

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                {currentUser && (
                  <div className="py-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{currentUser.name}</span>
                    </div>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
