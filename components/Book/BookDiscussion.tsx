// /src/components/Book/BookDiscussion.tsx
'use client'
import { useEffect, useState } from 'react'
import { useBookStore } from '@/lib/stores/bookStore'
import { useUserStore } from '@/lib/stores/userStore'
import { Discussion } from '@/lib/types'

const BookDiscussion = () => {
  const { currentBook } = useBookStore()
  const currentUser = useUserStore((state) => state.currentUser)
  const [discussions, setDiscussions] = useState<Discussion[]>([])
  const [newComment, setNewComment] = useState('')

  // In a real app, we'd fetch discussions from an API
  useEffect(() => {
    if (currentBook) {
      // Fetch discussions for current book
    }
  }, [currentBook])

  const handleAddComment = () => {
    if (!newComment.trim() || !currentUser) return

    // In a real app, we'd send this to an API
    const comment = {
      id: Math.random().toString(),
      userId: currentUser.id,
      content: newComment,
      timestamp: new Date().toISOString(),
    }

    setNewComment('')
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Discussion</h2>

      {discussions.map((discussion) => (
        <div key={discussion.id} className="rounded-lg bg-white p-6 shadow">
          {discussion.prompt && (
            <div className="mb-4 text-lg font-medium">{discussion.prompt}</div>
          )}

          <div className="space-y-4">
            {discussion.comments.map((comment) => (
              <div key={comment.id} className="border-b pb-4">
                <div className="flex items-start justify-between">
                  <span className="font-medium">User Name Here</span>
                  <span className="text-sm text-gray-500">
                    {new Date(comment.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-2 text-gray-600">{comment.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm"
              rows={3}
              placeholder="Add your thoughts..."
            />
            <button
              onClick={handleAddComment}
              className="mt-2 rounded-md bg-blue-500 px-4 py-2 text-white"
            >
              Post Comment
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BookDiscussion
