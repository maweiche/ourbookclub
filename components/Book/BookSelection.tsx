// /src/components/Book/BookSelection.tsx
'use client'
import React, { useEffect, useState } from 'react';
import { useBookStore } from '@/lib/stores/bookStore';
import { useGroupStore } from '@/lib/stores/groupStore';
import { useUserStore } from '@/lib/stores/userStore';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ThumbsUp } from 'lucide-react';

const BookSelection = () => {
  const [open, setOpen] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', author: '' });
  
  const currentUser = useUserStore((state) => state.currentUser);
  const activeGroupId = useUserStore((state) => state.activeGroupId);
  const currentGroup = useGroupStore((state) => 
    activeGroupId ? state.groups.get(activeGroupId) : null
  );
  const { books, fetchBooks, addVote, isLoading } = useBookStore();

  useEffect(() => {
    const fetchSuggestedBooks = async () => {
      if (currentGroup?.suggestedBooks) {
        console.log('Fetching suggested books:', currentGroup.suggestedBooks);
        await fetchBooks(currentGroup.suggestedBooks);
      }
    };

    fetchSuggestedBooks();
  }, [currentGroup?.suggestedBooks, fetchBooks]);

  const handleSubmitBook = async () => {
    if (!newBook.title || !newBook.author) return;
    
    // In a real app, you would make an API call here
    console.log('Suggesting new book:', newBook);
    
    // Reset form and close modal
    setNewBook({ title: '', author: '' });
    setOpen(false);
  };

  const handleVote = (bookId: string) => {
    if (!currentUser) return;
    addVote(bookId, currentUser.id, 1);
  };

  // Helper function to check if user has voted for a book
  const hasVoted = (bookId: string) => {
    const book = books.get(bookId);
    return book?.votes.some(vote => vote.userId === currentUser?.id);
  };

  console.log('Current state:', {
    booksSize: books.size,
    suggestedBooks: currentGroup?.suggestedBooks,
    allBooks: Array.from(books.entries())
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Book Selection</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-600">
              Suggest a Book
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Suggest a New Book</DialogTitle>
              <DialogDescription>
                Submit a book suggestion for the group to consider.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Book Title</Label>
                <Input
                  id="title"
                  value={newBook.title}
                  onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  placeholder="Enter book title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={newBook.author}
                  onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                  placeholder="Enter author name"
                />
              </div>
              <Button 
                className="w-full bg-blue-500 hover:bg-blue-600"
                onClick={handleSubmitBook}
                disabled={!newBook.title || !newBook.author}
              >
                Submit Suggestion
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from(books.values()).map((book) => (
          <Card key={book.id} className="overflow-hidden">
            <CardHeader className="space-y-2">
              <CardTitle className="line-clamp-1">{book.title}</CardTitle>
              <CardDescription>{book.author}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4">
                <img
                  src={book.coverImage || '/api/placeholder/96/144'}
                  alt={book.title}
                  className="h-36 w-24 rounded object-cover"
                />
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">
                      {book.votes.length} votes
                    </span>
                    {currentUser && (
                      <Button
                        variant={hasVoted(book.id) ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => handleVote(book.id)}
                        disabled={hasVoted(book.id)}
                        className="space-x-1"
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span>{hasVoted(book.id) ? 'Voted' : 'Vote'}</span>
                      </Button>
                    )}
                  </div>
                  {book.ratings.length > 0 && (
                    <div className="text-sm text-gray-600">
                      Average Rating: {(book.ratings.reduce((acc, r) => acc + r.rating, 0) / book.ratings.length).toFixed(1)}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BookSelection;