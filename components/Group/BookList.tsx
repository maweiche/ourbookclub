// /src/components/Group/BookList.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useBookStore } from '@/lib/stores/bookStore';
import { useGroupStore } from '@/lib/stores/groupStore';
import { useUserStore } from '@/lib/stores/userStore';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CalendarDays, MessageSquare } from 'lucide-react';

const BookList = () => {
  const router = useRouter();
  const activeGroupId = useUserStore((state) => state.activeGroupId);
  const currentGroup = useGroupStore((state) => 
    activeGroupId ? state.groups.get(activeGroupId) : null
  );
  const { books, fetchBooks, isLoading } = useBookStore();

  useEffect(() => {
    const fetchAllBooks = async () => {
      if (currentGroup) {
        const allBookIds = [
          currentGroup.currentBookId,
          ...currentGroup.readingHistory.map(h => h.bookId),
          ...currentGroup.suggestedBooks
        ].filter((id): id is string => Boolean(id));

        await fetchBooks(allBookIds);
      }
    };

    fetchAllBooks();
  }, [currentGroup, fetchBooks]);

  const handleBookClick = (bookId: string) => {
    if (activeGroupId) {
      router.push(`/groups/${activeGroupId}/books/${bookId}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Current Book Section */}
      {currentGroup?.currentBookId && books.get(currentGroup.currentBookId) && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Current Book</h2>
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleBookClick(currentGroup.currentBookId!)}
          >
            <CardHeader className="space-y-2">
              <CardTitle className="text-xl">
                {books.get(currentGroup.currentBookId)?.title}
              </CardTitle>
              <CardDescription>
                {books.get(currentGroup.currentBookId)?.author}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4">
                <img
                  src={books.get(currentGroup.currentBookId)?.coverImage || '/api/placeholder/96/144'}
                  alt={books.get(currentGroup.currentBookId)?.title}
                  className="h-36 w-24 rounded object-cover"
                />
                <div className="space-y-2">
                  {books.get(currentGroup.currentBookId)?.ratings.length ? (
                    <div className="text-sm text-gray-600">
                      Average Rating: {(books.get(currentGroup.currentBookId)!.ratings
                        .reduce((acc, r) => acc + r.rating, 0) / 
                        books.get(currentGroup.currentBookId)!.ratings.length
                      ).toFixed(1)}/5
                    </div>
                  ) : null}
                  <div className="flex space-x-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {books.get(currentGroup.currentBookId)?.ratings.length || 0} reviews
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Reading History Section */}
      {currentGroup?.readingHistory.length ? (
        <section>
          <h2 className="text-2xl font-bold mb-4">Reading History</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {currentGroup.readingHistory.map((history) => {
              const book = books.get(history.bookId);
              if (!book) return null;

              return (
                <Card 
                  key={history.bookId}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleBookClick(history.bookId)}
                >
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{book.title}</CardTitle>
                    <CardDescription>{book.author}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start space-x-4">
                      <img
                        src={book.coverImage || '/api/placeholder/96/144'}
                        alt={book.title}
                        className="h-24 w-16 rounded object-cover"
                      />
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <CalendarDays className="mr-1 h-4 w-4" />
                          <span>
                            Completed {new Date(history.completedDate).toLocaleDateString()}
                          </span>
                        </div>
                        {book.ratings.length > 0 && (
                          <div className="text-sm text-gray-600">
                            Rating: {(book.ratings.reduce((acc, r) => acc + r.rating, 0) / 
                              book.ratings.length).toFixed(1)}/5
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default BookList;