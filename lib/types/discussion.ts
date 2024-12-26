// /src/lib/types/discussion.ts
export interface Comment {
  id: string
  userId: string
  content: string
  timestamp: string
}

export interface Discussion {
  id: string
  bookId: string
  groupId: string
  chapter?: number
  prompt?: string
  comments: Comment[]
}
