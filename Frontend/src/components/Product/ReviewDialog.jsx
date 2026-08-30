import { useState } from 'react';
import { Loader2, Star } from 'lucide-react';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { useCreateProductReviewMutation } from '../../store/api/productApi';

const ReviewDialog = ({ open, onOpenChange, productId, productName }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [createProductReview, { isLoading }] = useCreateProductReviewMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error('Please select a star rating');
      return;
    }

    try {
      await createProductReview({ productId, rating, comment }).unwrap();
      toast.success('Review submitted, thanks for the feedback');
      setRating(0);
      setComment('');
      onOpenChange(false);
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to submit review');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Write a review</DialogTitle>
          <DialogDescription>Share your thoughts on {productName}.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label>Your rating</Label>
            <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHoverRating(value)}
                  aria-label={`${value} star${value > 1 ? 's' : ''}`}
                  className="cursor-pointer p-0.5"
                >
                  <Star
                    className={`h-7 w-7 transition-colors ${
                      value <= (hoverRating || rating) ? 'fill-amber-400 text-amber-400' : 'text-zinc-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="review-comment">Your review</Label>
            <textarea
              id="review-comment"
              rows={4}
              required
              placeholder="What did you like or dislike?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border-input flex w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-amber-600 hover:bg-amber-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting
                </>
              ) : (
                'Submit review'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
