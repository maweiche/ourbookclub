// bookStore.ts
import { create } from 'zustand';
import { BookState } from '../types';
import { api } from '@/lib/api/endpoints';

export const useBookStore = create<BookState>((set, get) => ({
  books: new Map(),
  currentBook: null,
  isLoading: false,
  error: null,

  fetchBooks: async (bookIds: string[]) => {
    // Don't fetch if no bookIds provided
    if (!bookIds || bookIds.length === 0) {
      return;
    }

    set({ isLoading: true, error: null });
    
    try {
      console.log('BookStore: Fetching books for IDs:', bookIds);
      const { data, error } = await api.books.list(bookIds);

      if (error) {
        console.error('BookStore: Error fetching books:', error);
        set({ error, isLoading: false });
        return;
      }

      if (data && Array.isArray(data)) {
        console.log('BookStore: Received books data:', data);
        const booksMap = new Map();
        data.forEach(book => {
          booksMap.set(book.id, book);
        });
        
        set({ 
          books: booksMap,
          isLoading: false,
          error: null
        });
      }
    } catch (err) {
      console.error('BookStore: Failed to fetch books:', err);
      set({ 
        error: err instanceof Error ? err.message : 'Failed to fetch books',
        isLoading: false
      });
    }
  },

  setCurrentBook: (bookId: string) => {
    const book = get().books.get(bookId);
    if (book) {
      set({ currentBook: book });
    }
  },

  addVote: (bookId, userId, value) => {
    const books = get().books;
    const book = books.get(bookId);
    if (book) {
      const updatedVotes = book.votes.filter((v) => v.userId !== userId);
      updatedVotes.push({ userId, value });
      const updatedBook = { ...book, votes: updatedVotes };
      books.set(bookId, updatedBook);
      set({ books: new Map(books) });
    }
  },

  addRating: (bookId, userId, rating, review) => {
    const books = get().books;
    const book = books.get(bookId);
    if (book) {
      const updatedRatings = book.ratings.filter((r) => r.userId !== userId);
      updatedRatings.push({ userId, rating, review });
      const updatedBook = { ...book, ratings: updatedRatings };
      books.set(bookId, updatedBook);
      set({ books: new Map(books) });
    }
  },
}));