import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth.config';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const createReviewSchema = z.object({
    roomId: z.string(),
    rating: z.number().int().min(1).max(5),
    title: z.string().min(1).max(100),
    comment: z.string().min(10).max(1000),
});

// GET /api/reviews - Fetch reviews for a room
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const roomId = searchParams.get('roomId');
        const sortBy = searchParams.get('sortBy') || 'recent';

        if (!roomId) {
            return NextResponse.json(
                { success: false, error: 'Room ID is required' },
                { status: 400 }
            );
        }

        let orderBy: any = { createdAt: 'desc' };

        if (sortBy === 'helpful') {
            orderBy = { helpful: 'desc' };
        } else if (sortBy === 'rating') {
            orderBy = { rating: 'desc' };
        }

        const reviews = await prisma.review.findMany({
            where: { roomId },
            include: {
                user: {
                    select: {
                        name: true,
                        image: true,
                    },
                },
            },
            orderBy,
        });

        // Calculate average rating
        const avgRating = reviews.length > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 0;

        return NextResponse.json({
            success: true,
            data: {
                reviews,
                stats: {
                    total: reviews.length,
                    average: avgRating,
                },
            },
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch reviews' },
            { status: 500 }
        );
    }
}

// POST /api/reviews - Create a review
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { roomId, rating, title, comment } = createReviewSchema.parse(body);

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

        // Check if user already reviewed this room
        const existingReview = await prisma.review.findFirst({
            where: {
                roomId,
                userId: user.id,
            },
        });

        if (existingReview) {
            return NextResponse.json(
                { success: false, error: 'You have already reviewed this room' },
                { status: 400 }
            );
        }

        // Create review
        const review = await prisma.review.create({
            data: {
                roomId,
                userId: user.id,
                rating,
                title,
                comment,
                photos: [],
            },
            include: {
                user: {
                    select: {
                        name: true,
                        image: true,
                    },
                },
            },
        });

        return NextResponse.json({
            success: true,
            data: review,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, error: 'Invalid request data', details: error.errors },
                { status: 400 }
            );
        }

        console.error('Error creating review:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create review' },
            { status: 500 }
        );
    }
}
