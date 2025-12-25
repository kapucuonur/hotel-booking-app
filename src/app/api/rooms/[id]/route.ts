import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

interface RouteParams {
    params: Promise<{
        id: string;
    }>;
}

// GET /api/rooms/[id] - Fetch single room details
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;

        const room = await prisma.room.findUnique({
            where: { id },
            include: {
                hotel: true,
            },
        });

        if (!room) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Room not found',
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: room,
        });
    } catch (error) {
        console.error('Error fetching room:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch room',
            },
            { status: 500 }
        );
    }
}
