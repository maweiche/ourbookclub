import { create } from 'zustand'
import mockData from '../data/mockData.json'
import { BookState } from '../types'

// bookStore.ts

export const useBookStore = create<BookState>((set, get) => ({
  books: new Map(),
  currentBook: null,

  fetchBooks: (bookIds) => {
    const booksMap = new Map()
    const selectedBooks = mockData.books.filter((b) => bookIds.includes(b.id))
    selectedBooks.forEach((book) => booksMap.set(book.id, book))
    set({ books: booksMap })
  },

  setCurrentBook: (bookId) => {
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
