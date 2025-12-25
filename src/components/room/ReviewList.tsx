'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { StarRating } from '@/components/ui/star-rating';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, Loader2 } from 'lucide-react';

interface Review {
    id: string;
    rating: number;
    title: string;
    comment: string;
    helpful: number;
    notHelpful: number;
    createdAt: string;
    user: {
        name: string | null;
        image: string | null;
    };
}

interface ReviewListProps {
    roomId: string;
}

export function ReviewList({ roomId }: ReviewListProps) {
    const { data: session } = useSession();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [stats, setStats] = useState({ total: 0, average: 0 });
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('recent');

    useEffect(() => {
        fetchReviews();
    }, [roomId, sortBy]);

    const fetchReviews = async () => {
        try {
            const response = await fetch(`/api/reviews?roomId=${roomId}&sortBy=${sortBy}`);
            const data = await response.json();

            if (data.success) {
                setReviews(data.data.reviews);
                setStats(data.data.stats);
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleVote = async (reviewId: string, helpful: boolean) => {
        if (!session) return;

        try {
            const response = await fetch(`/api/reviews/${reviewId}/vote`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ helpful }),
            });

            if (response.ok) {
                fetchReviews(); // Refresh reviews
            }
        } catch (error) {
            console.error('Error voting:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Stats Summary */}
            {stats.total > 0 && (
                <div className="bg-card border rounded-lg p-6">
                    <div className="flex items-center gap-4">
                        <div>
                            <div className="text-4xl font-bold">{stats.average.toFixed(1)}</div>
                            <StarRating value={Math.round(stats.average)} onChange={() => { }} readonly size="sm" />
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Based on {stats.total} {stats.total === 1 ? 'review' : 'reviews'}
                        </div>
                    </div>
                </div>
            )}

            {/* Sort Options */}
            {reviews.length > 0 && (
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Sort by:</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-3 py-1.5 border rounded-md text-sm"
                    >
                        <option value="recent">Most Recent</option>
                        <option value="helpful">Most Helpful</option>
                        <option value="rating">Highest Rating</option>
                    </select>
                </div>
            )}

            {/* Reviews List */}
            {reviews.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                    <p>No reviews yet. Be the first to review!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-card border rounded-lg p-6 space-y-3">
                            {/* Header */}
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    {review.user.image ? (
                                        <img
                                            src={review.user.image}
                                            alt={review.user.name || 'User'}
                                            className="h-10 w-10 rounded-full"
                                        />
                                    ) : (
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <span className="text-sm font-medium">
                                                {review.user.name?.charAt(0) || 'U'}
                                            </span>
                                        </div>
                                    )}
                                    <div>
                                        <div className="font-medium">{review.user.name || 'Anonymous'}</div>
                                        <div className="text-xs text-muted-foreground">
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                                <StarRating value={review.rating} onChange={() => { }} readonly size="sm" />
                            </div>

                            {/* Content */}
                            <div>
                                <h4 className="font-semibold mb-1">{review.title}</h4>
                                <p className="text-muted-foreground">{review.comment}</p>
                            </div>

                            {/* Voting */}
                            <div className="flex items-center gap-4 pt-2 border-t">
                                <span className="text-sm text-muted-foreground">Was this helpful?</span>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleVote(review.id, true)}
                                        disabled={!session}
                                        className="gap-1"
                                    >
                                        <ThumbsUp className="h-4 w-4" />
                                        <span>{review.helpful}</span>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleVote(review.id, false)}
                                        disabled={!session}
                                        className="gap-1"
                                    >
                                        <ThumbsDown className="h-4 w-4" />
                                        <span>{review.notHelpful}</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
