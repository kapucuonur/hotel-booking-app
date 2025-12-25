import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth.config';
import { prisma } from '@/lib/db';
import { z } from 'zod';

// GET /api/bookings - Fetch user's bookings
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

        const bookings = await prisma.booking.findMany({
            where: { userId: user.id },
            include: {
                room: {
                    include: {
                        hotel: true,
                    },
                },
                payment: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json({
            success: true,
            data: bookings,
        });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch bookings',
            },
            { status: 500 }
        );
    }
}

// POST /api/bookings - Create a new booking
const createBookingSchema = z.object({
    roomId: z.string(),
    checkIn: z.string(),
    checkOut: z.string(),
    guests: z.number().int().positive(),
});

export async function POST(request: NextRequest) {
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

        const body = await request.json();
        const validatedData = createBookingSchema.parse(body);

        // Check if room exists
        const room = await prisma.room.findUnique({
            where: { id: validatedData.roomId },
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

        // Check if room is available for the dates
        const checkIn = new Date(validatedData.checkIn);
        const checkOut = new Date(validatedData.checkOut);

        const conflictingBookings = await prisma.booking.findMany({
            where: {
                roomId: validatedData.roomId,
                status: {
                    in: ['PENDING', 'CONFIRMED'],
                },
                OR: [
                    {
                        AND: [
                            { checkIn: { lte: checkIn } },
                            { checkOut: { gt: checkIn } },
                        ],
                    },
                    {
                        AND: [
                            { checkIn: { lt: checkOut } },
                            { checkOut: { gte: checkOut } },
                        ],
                    },
                    {
                        AND: [
                            { checkIn: { gte: checkIn } },
                            { checkOut: { lte: checkOut } },
                        ],
                    },
                ],
            },
        });

        if (conflictingBookings.length > 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Room is not available for the selected dates',
                },
                { status: 409 }
            );
        }

        // Calculate total price
        const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
        const totalPrice = room.price * nights;

        // Create booking
        const booking = await prisma.booking.create({
            data: {
                userId: user.id,
                roomId: validatedData.roomId,
                checkIn,
                checkOut,
                guests: validatedData.guests,
                totalPrice,
                status: 'PENDING',
            },
            include: {
                room: {
                    include: {
                        hotel: true,
                    },
                },
            },
        });

        return NextResponse.json({
            success: true,
            data: booking,
            message: 'Booking created successfully',
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

        console.error('Error creating booking:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to create booking',
            },
            { status: 500 }
        );
    }
}
