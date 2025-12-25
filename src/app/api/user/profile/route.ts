import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth.config';
import { prisma } from '@/lib/db';
import { z } from 'zod';

// GET /api/user/profile - Fetch user profile
export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Unauthorized',
                },
                { status: 401 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                phone: true,
                createdAt: true,
            },
        });

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'User not found',
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: user,
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch user profile',
            },
            { status: 500 }
        );
    }
}

// PUT /api/user/profile - Update user profile
const updateProfileSchema = z.object({
    name: z.string().min(1).optional(),
    phone: z.string().optional(),
});

export async function PUT(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Unauthorized',
                },
                { status: 401 }
            );
        }

        const body = await request.json();
        const validatedData = updateProfileSchema.parse(body);

        const updatedUser = await prisma.user.update({
            where: { email: session.user.email },
            data: validatedData,
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                phone: true,
                createdAt: true,
            },
        });

        return NextResponse.json({
            success: true,
            data: updatedUser,
            message: 'Profile updated successfully',
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Invalid request data',
                    details: error.errors,
                },
                { status: 400 }
            );
        }

        console.error('Error updating user profile:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to update user profile',
            },
            { status: 500 }
        );
    }
}
