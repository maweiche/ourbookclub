// /src/components/Book/BookRating.tsx
'use client'
import { useState } from 'react'
import { useBookStore } from '@/lib/stores/bookStore'
import { useUserStore } from '@/lib/stores/userStore'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Star, Send } from 'lucide-react'

const BookRating = () => {
  const { currentBook, addRating } = useBookStore()
  const currentUser = useUserStore((state) => state.currentUser)
  const [rating, setRating] = useState('0')
  const [review, setReview] = useState('')

  const handleSubmitRating = () => {
    if (!currentBook || !currentUser || rating === '0') return

    addRating(currentBook.id, currentUser.id, Number(rating), review)
    setRating('0')
    setReview('')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5" />
          Rate this Book
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <Select value={rating} onValueChange={setRating}>
              <SelectTrigger>
                <SelectValue placeholder="Select a rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="0" disabled>
                    Select rating
                  </SelectItem>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      <span className="flex items-center gap-2">
                        {num} {num === 1 ? 'star' : 'stars'}
                        <span className="flex">
                          {Array.from({ length: num }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-current" />
                          ))}
                        </span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="review">Review (optional)</Label>
            <Textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={4}
              placeholder="Share your thoughts about the book..."
              className="resize-none"
            />
          </div>

          <Button
            onClick={handleSubmitRating}
            disabled={rating === '0'}
            className="w-full"
          >
            <Send className="mr-2 h-4 w-4" />
            Submit Rating
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BookRating
