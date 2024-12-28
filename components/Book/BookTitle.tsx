// /src/components/Book/BookTitle.tsx
import { useBookStore } from '@/lib/stores/bookStore'
import { useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { BookOpen } from 'lucide-react'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

const BookTitle = ({ bookId }: { bookId: string }) => {
  const { books, fetchBooks } = useBookStore()

  useEffect(() => {
    fetchBooks([bookId])
  }, [bookId])

  const book = books.get(bookId)

  if (!book) {
    return <Skeleton className="h-5 w-[200px]" />
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Badge variant="secondary" className="cursor-pointer">
          <BookOpen className="mr-1 h-3 w-3" />
          Currently reading: {book.title}
        </Badge>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex flex-col space-y-2">
          <h4 className="text-sm font-semibold">{book.title}</h4>
          <p className="text-sm text-muted-foreground">by {book.author}</p>
          <p className="text-xs text-muted-foreground">
            {book.totalPages} pages
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export default BookTitle
