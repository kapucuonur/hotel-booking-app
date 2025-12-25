'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/ui/star-rating';
import { Loader2 } from 'lucide-react';

interface ReviewFormProps {
    roomId: string;
    onSuccess?: () => void;
}

export function ReviewForm({ roomId, onSuccess }: ReviewFormProps) {
    const { data: session } = useSession();
    const router = useRouter();
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!session) {
            router.push('/auth/signin');
            return;
        }

        if (rating === 0) {
            setError('Please select a rating');
            return;
        }

        setSubmitting(true);
        setError(null);

        try {
            const response = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    roomId,
                    rating,
                    title,
                    comment,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit review');
            }

            // Reset form
            setRating(0);
            setTitle('');
            setComment('');

            if (onSuccess) {
                onSuccess();
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to submit review');
        } finally {
            setSubmitting(false);
        }
    };

    if (!session) {
        return (
            <div className="bg-card border rounded-lg p-6 text-center">
                <p className="text-muted-foreground mb-4">Sign in to leave a review</p>
                <Button onClick={() => router.push('/auth/signin')}>
                    Sign In
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-card border rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold">Write a Review</h3>

            {error && (
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg p-3 text-sm text-red-700 dark:text-red-400">
                    {error}
                </div>
            )}

            {/* Rating */}
            <div>
                <label className="block text-sm font-medium mb-2">Your Rating *</label>
                <StarRating value={rating} onChange={setRating} size="lg" />
            </div>

            {/* Title */}
            <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                    Review Title *
                </label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Sum up your experience"
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            {/* Comment */}
            <div>
                <label htmlFor="comment" className="block text-sm font-medium mb-2">
                    Your Review *
                </label>
                <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience with this room"
                    required
                    rows={5}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
            </div>

            {/* Submit Button */}
            <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                    </>
                ) : (
                    'Submit Review'
                )}
            </Button>
        </form>
    );
}
