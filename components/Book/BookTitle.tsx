import { useBookStore } from "@/lib/stores/bookStore"
import { useEffect } from "react"

const BookTitle = ({ bookId }: { bookId: string }) => {
  const { books, fetchBooks } = useBookStore()

  useEffect(() => {
    fetchBooks([bookId])
  }, [bookId])

  const book = books.get(bookId)
  
  return (
    <div className="text-sm text-gray-500">
      Currently reading: {book ? book.title : 'Loading...'}
    </div>
  )
}

export default BookTitle