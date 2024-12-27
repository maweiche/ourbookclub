import { create } from 'zustand'
import mockData from '../data/mockData.json'
import { BookState } from '../types'
import { api } from '@/lib/api/endpoints'

// bookStore.ts

export const useBookStore = create<BookState>((set, get) => ({
  books: new Map(),
  currentBook: null,
  isLoading: false,
  error: null,

  fetchBooks: async (bookIds: string[]) => {
    set({ isLoading: true, error: null })
    
    try {
      const { data, error } = await api.books.list(bookIds)

      if (error) {
        set({ error, isLoading: false })
        return
      }

      if (data && Array.isArray(data)) {
        const booksMap = new Map()
        data.forEach(book => {
          booksMap.set(book.id, book)
        })
        
        set({ 
          books: booksMap,
          isLoading: false,
          error: null
        })
      }
    } catch (err) {
      set({ 
        error: err instanceof Error ? err.message : 'Failed to fetch books',
        isLoading: false
      })
    }
  },

  setCurrentBook: (bookId: string) => {
    const book = get().books.get(bookId)
    if (book) {
      set({ currentBook: book })
    }
  },

  addVote: (bookId, userId, value) => {
    const books = get().books
    const book = books.get(bookId)
    if (book) {
      const updatedVotes = book.votes.filter((v) => v.userId !== userId)
      updatedVotes.push({ userId, value })
      const updatedBook = { ...book, votes: updatedVotes }
      books.set(bookId, updatedBook)
      set({ books: new Map(books) })
    }
  },

  addRating: (bookId, userId, rating, review) => {
    const books = get().books
    const book = books.get(bookId)
    if (book) {
      const updatedRatings = book.ratings.filter((r) => r.userId !== userId)
      updatedRatings.push({ userId, rating, review })
      const updatedBook = { ...book, ratings: updatedRatings }
      books.set(bookId, updatedBook)
      set({ books: new Map(books) })
    }
  },
}))
