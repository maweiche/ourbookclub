// src/components/Dashboard/ReadingProgressCard.tsx
'use client'

import { useEffect } from 'react'
import { useGroupStore } from '@/lib/stores/groupStore'
import { useBookStore } from '@/lib/stores/bookStore'
import { useUserStore } from '@/lib/stores/userStore'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { BookOpen, Book } from 'lucide-react'

const ReadingProgressCard = () => {
  const activeGroupId = useUserStore((state) => state.activeGroupId)
  const activeGroup = useGroupStore((state) =>
    activeGroupId ? state.groups.get(activeGroupId) : null
  )
  const { books, fetchBooks, isLoading } = useBookStore()

  useEffect(() => {
    const fetchCurrentBook = async () => {
      if (activeGroup?.currentBookId) {
        console.log('Fetching book:', activeGroup.currentBookId)
        await fetchBooks([activeGroup.currentBookId])
      }
    }

    fetchCurrentBook()
  }, [activeGroup?.currentBookId, fetchBooks])

  const currentBook = activeGroup?.currentBookId
    ? books.get(activeGroup.currentBookId)
    : null

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Current Reading</CardTitle>
        </CardHeader>
        <CardContent className="flex space-x-4">
          <Skeleton className="h-36 w-24 rounded-md" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-2 w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Current Reading
        </CardTitle>
      </CardHeader>
      <CardContent>
        {currentBook ? (
          <div className="flex items-start space-x-4">
            <Avatar className="h-36 w-24 rounded-md">
              <AvatarImage
                src={currentBook.coverImage}
                alt={currentBook.title}
                className="object-cover"
              />
              <AvatarFallback className="rounded-md">
                <Book className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="mb-2 font-medium leading-none">
                  {currentBook.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {currentBook.author}
                </p>
              </div>
              <div className="space-y-2">
                <Progress value={45} />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Page 150</span>
                  <span>of {currentBook.totalPages}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Book className="mb-2 h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No book currently selected
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ReadingProgressCard
