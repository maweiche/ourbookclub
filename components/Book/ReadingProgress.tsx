// /src/components/Book/ReadingProgress.tsx
'use client'
import { useState } from 'react'
import { useBookStore } from '@/lib/stores/bookStore'
import { useUserStore } from '@/lib/stores/userStore'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { BookOpen, Save } from 'lucide-react'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

const ReadingProgress = () => {
  const { currentBook } = useBookStore()
  const currentUser = useUserStore((state) => state.currentUser)
  const [currentPage, setCurrentPage] = useState(0)

  const progressPercentage = currentBook
    ? (currentPage / currentBook.totalPages) * 100
    : 0

  const handleUpdateProgress = () => {
    // In a real app, we'd update this in the backend
    console.log(`Updated progress: ${currentPage} pages`)
  }

  if (!currentBook) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Reading Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min={0}
              max={currentBook.totalPages}
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
              className="w-24"
            />
            <span className="text-sm text-muted-foreground">
              of {currentBook.totalPages} pages
            </span>
          </div>
          <Button onClick={handleUpdateProgress}>
            <Save className="mr-2 h-4 w-4" />
            Update
          </Button>
        </div>

        <div className="space-y-2">
          <HoverCard>
            <HoverCardTrigger asChild>
              <div>
                <Progress value={progressPercentage} />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="text-sm">
              You've read {Math.round(progressPercentage)}% of the book
            </HoverCardContent>
          </HoverCard>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ReadingProgress
