import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth.config';
import { prisma } from '@/lib/db';
import { z } from 'zod';

// GET /api/rooms - Fetch all rooms with optional filters
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const capacity = searchParams.get('capacity');

        const rooms = await prisma.room.findMany({
            where: {
                ...(type && { type }),
                ...(minPrice && { price: { gte: parseFloat(minPrice) } }),
                ...(maxPrice && { price: { lte: parseFloat(maxPrice) } }),
                ...(capacity && { capacity: { gte: parseInt(capacity) } }),
            },
            include: {
                hotel: true,
            },
            orderBy: {
                price: 'asc',
            },
        });

        // Map database fields to frontend format
        const mappedRooms = rooms.map(room => ({
            id: room.id,
            title: room.title,
            description: room.description,
            type: room.type,
            price: room.price,
            capacity: room.capacity,
            imageUrl: room.imageUrl,
            amenities: room.amenities,
            hotel: {
                name: room.hotel.name,
                city: room.hotel.city,
                rating: room.hotel.rating,
            },
        }));

        return NextResponse.json({
            success: true,
            rooms: mappedRooms,
        });
    } catch (error) {
        console.error('Error fetching rooms:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch rooms',
            },
            { status: 500 }
        );
    }
}

// POST /api/rooms - Create a new room (admin only)
const createRoomSchema = z.object({
    hotelId: z.string(),
    title: z.string().min(1),
    description: z.string().min(1),
    type: z.string(),
    price: z.number().positive(),
    capacity: z.number().int().positive(),
    size: z.number().int().positive(),
    imageUrl: z.string().url(),
    amenities: z.array(z.string()),
});

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Unauthorized',
                },
                { status: 401 }
            );
        }

        const body = await request.json();
        const validatedData = createRoomSchema.parse(body);

        const room = await prisma.room.create({
            data: validatedData,
            include: {
                hotel: true,
            },
        });

        return NextResponse.json({
            success: true,
            data: room,
            message: 'Room created successfully',
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

        console.error('Error creating room:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to create room',
            },
            { status: 500 }
        );
    }
}
