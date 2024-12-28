// /src/components/Book/BookDiscussion.tsx
'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useBookStore } from '@/lib/stores/bookStore';
import { useUserStore } from '@/lib/stores/userStore';
import { useGroupStore } from '@/lib/stores/groupStore';
import { Discussion } from '@/lib/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const BookDiscussion = () => {
  const params = useParams();
  const { currentBook, books } = useBookStore();
  const currentUser = useUserStore((state) => state.currentUser);
  const activeGroupId = useUserStore((state) => state.activeGroupId);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [newComment, setNewComment] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  // Load mock discussions (in a real app, this would be an API call)
  useEffect(() => {
    if (currentBook) {
      // Load discussions from mockData
      const mockDiscussions = [
        {
          id: 'd1',
          bookId: currentBook.id,
          groupId: activeGroupId || '',
          chapter: 1,
          prompt: "What are your initial thoughts about the book so far?",
          comments: [
            {
              id: 'c1',
              userId: 'u1',
              content: "A masterpiece of science fiction! The world-building is incredible.",
              timestamp: new Date().toISOString()
            }
          ]
        }
      ];
      setDiscussions(mockDiscussions);
    }
  }, [currentBook, activeGroupId]);

  const handleAddComment = () => {
    if (!newComment.trim() || !currentUser || !currentBook) return;

    const comment = {
      id: `c${Date.now()}`,
      userId: currentUser.id,
      content: newComment,
      timestamp: new Date().toISOString(),
    };

    // Update the first discussion with the new comment
    if (discussions.length > 0) {
      const updatedDiscussions = discussions.map(discussion => ({
        ...discussion,
        comments: [...discussion.comments, comment]
      }));
      setDiscussions(updatedDiscussions);
    }

    setNewComment('');
  };

  const handleUpdateProgress = () => {
    // In a real app, we'd update this in the backend
    console.log(`Updated progress: ${currentPage} pages`);
  };

  if (!currentBook) {
    return (
      <div className="text-center py-8">
        <p>Loading book details...</p>
      </div>
    );
  }

  const progressPercentage = (currentPage / currentBook.totalPages) * 100;

  return (
    <div className="space-y-6">
      {/* Book Details & Reading Progress */}
      <Card className="bg-white">
        <CardHeader className="space-y-2">
          <CardTitle className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">{currentBook.title}</h2>
              <p className="text-gray-600 text-sm mt-1">{currentBook.author}</p>
            </div>
            {currentBook.ratings.length > 0 && (
              <div className="text-sm text-gray-600">
                Average Rating: {(currentBook.ratings.reduce((acc, r) => acc + r.rating, 0) / 
                  currentBook.ratings.length).toFixed(1)}/5
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="number"
                min={0}
                max={currentBook.totalPages}
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                className="w-24 rounded-md border-gray-300 p-2"
              />
              <span className="text-gray-600">
                of {currentBook.totalPages} pages
              </span>
              <Button
                onClick={handleUpdateProgress}
                variant="secondary"
              >
                Update Progress
              </Button>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full">
              <div
                className="h-2 bg-blue-600 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Discussions */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Discussion</h2>
        
        {discussions.map((discussion) => (
          <Card key={discussion.id} className="bg-white">
            <CardContent className="pt-6">
              {discussion.prompt && (
                <div className="mb-6 text-lg font-medium text-gray-800">
                  {discussion.prompt}
                </div>
              )}

              <div className="space-y-6">
                {discussion.comments.map((comment) => (
                  <div key={comment.id} className="border-b border-gray-200 pb-4">
                    <div className="flex items-start justify-between">
                      <span className="font-medium">
                        {comment.userId === currentUser?.id ? 'You' : 'Other Reader'}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-700">{comment.content}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-4">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                  placeholder="Share your thoughts..."
                  className="w-full"
                />
                <Button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="w-full bg-blue-500 hover:bg-blue-600"
                >
                  Post Comment
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BookDiscussion;