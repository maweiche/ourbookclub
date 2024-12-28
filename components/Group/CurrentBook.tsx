// /src/components/Group/CurrentBook.tsx
'use client'

import { useEffect } from 'react'
import { Group } from '@/lib/types'
import { useBookStore } from '@/lib/stores/bookStore'
import LoadingSpinner from '@/components/ui/loading-spinner'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Star } from 'lucide-react'

interface CurrentBookProps {
  group: Group
}

const CurrentBook = ({ group }: CurrentBookProps) => {
  const { books, fetchBooks, isLoading } = useBookStore()

  useEffect(() => {
    if (group.currentBookId) {
      fetchBooks([group.currentBookId])
    }
  }, [group.currentBookId])

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Current Book</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <LoadingSpinner />
        </CardContent>
      </Card>
    )
  }

  const currentBook = group.currentBookId
    ? books.get(group.currentBookId)
    : null

  if (!currentBook) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Current Book</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No book currently selected</p>
        </CardContent>
      </Card>
    )
  }

  const averageRating =
    currentBook.ratings.length > 0
      ? (
          currentBook.ratings.reduce((acc, r) => acc + r.rating, 0) /
          currentBook.ratings.length
        ).toFixed(1)
      : null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Book</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-6">
          <Avatar className="h-48 w-32 rounded-md">
            <AvatarImage
              src={currentBook.coverImage}
              alt={currentBook.title}
              className="object-cover"
            />
            <AvatarFallback className="rounded-md">
              {currentBook.title.substring(0, 2)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-lg font-medium leading-none">
                {currentBook.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {currentBook.author}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {averageRating ? (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  {averageRating}/5
                </Badge>
              ) : (
                <Badge variant="outline">No ratings yet</Badge>
              )}
            </div>

            {currentBook.ratings.length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className="mb-3 text-sm font-medium leading-none">
                    Recent Reviews
                  </h4>
                  <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                    <div className="space-y-4">
                      {currentBook.ratings
                        .filter((r) => r.review)
                        .slice(0, 3)
                        .map((rating) => (
                          <div
                            key={`${rating.userId}-${rating.rating}`}
                            className="space-y-2"
                          >
                            <div className="flex items-center gap-2">
                              <Badge>
                                <Star className="mr-1 h-3 w-3" />
                                {rating.rating}/5
                              </Badge>
                            </div>
                            {rating.review && (
                              <p className="text-sm text-muted-foreground">
                                {rating.review}
                              </p>
                            )}
                            <Separator />
                          </div>
                        ))}
                    </div>
                  </ScrollArea>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CurrentBook
