// /src/lib/types/book.ts
export interface Vote {
  userId: string
  value: number
}

export interface Rating {
  userId: string
  rating: number
  review?: string
}

export interface Book {
  id: string
  title: string
  author: string
  coverImage: string
  totalPages: number
  votes: Vote[]
  ratings: Rating[]
}

export interface BookState {
  books: Map<string, Book>
  currentBook: Book | null
  isLoading: boolean
  error: string | null
  fetchBooks: (bookIds: string[]) => Promise<void>
  setCurrentBook: (bookId: string) => void
  addVote: (bookId: string, userId: string, value: number) => void
  addRating: (bookId: string, userId: string, rating: number, review?: string) => void
}
