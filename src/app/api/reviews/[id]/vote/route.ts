import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth.config';
import { prisma } from '@/lib/db';

interface RouteParams {
    params: Promise<{
        id: string;
    }>;
}

// POST /api/reviews/[id]/vote - Vote on a review
export async function POST(request: NextRequest, { params }: RouteParams) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { id: reviewId } = await params;
        const body = await request.json();
        const { helpful } = body;

        if (typeof helpful !== 'boolean') {
            return NextResponse.json(
                { success: false, error: 'Invalid vote value' },
                { status: 400 }
            );
        }

        // Get user
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 }
            );
        }

        // Check if user already voted
        const existingVote = await prisma.reviewVote.findUnique({
            where: {
                reviewId_userId: {
                    reviewId,
                    userId: user.id,
                },
            },
        });

        if (existingVote) {
            // Update existing vote
            await prisma.reviewVote.update({
                where: {
                    reviewId_userId: {
                        reviewId,
                        userId: user.id,
                    },
                },
                data: { helpful },
            });

            // Update review counts
            const review = await prisma.review.findUnique({
                where: { id: reviewId },
                include: { votes: true },
            });

            if (review) {
                const helpfulCount = review.votes.filter(v => v.helpful).length;
                const notHelpfulCount = review.votes.filter(v => !v.helpful).length;

                await prisma.review.update({
                    where: { id: reviewId },
                    data: {
                        helpful: helpfulCount,
                        notHelpful: notHelpfulCount,
                    },
                });
            }
        } else {
            // Create new vote
            await prisma.reviewVote.create({
                data: {
                    reviewId,
                    userId: user.id,
                    helpful,
                },
            });

            // Update review counts
            await prisma.review.update({
                where: { id: reviewId },
                data: {
                    [helpful ? 'helpful' : 'notHelpful']: {
                        increment: 1,
                    },
                },
            });
        }

        return NextResponse.json({
            success: true,
            message: 'Vote recorded',
        });
    } catch (error) {
        console.error('Error voting on review:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to vote on review' },
            { status: 500 }
        );
    }
}
