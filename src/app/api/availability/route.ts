import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const availabilitySchema = z.object({
    roomId: z.string(),
    checkIn: z.string(),
    checkOut: z.string(),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { roomId, checkIn, checkOut } = availabilitySchema.parse(body);

        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        // Check for conflicting bookings
        const conflictingBookings = await prisma.booking.findMany({
            where: {
                roomId,
                status: {
                    in: ['PENDING', 'CONFIRMED'],
                },
                OR: [
                    {
                        AND: [
                            { checkIn: { lte: checkInDate } },
                            { checkOut: { gt: checkInDate } },
                        ],
                    },
                    {
                        AND: [
                            { checkIn: { lt: checkOutDate } },
                            { checkOut: { gte: checkOutDate } },
                        ],
                    },
                    {
                        AND: [
                            { checkIn: { gte: checkInDate } },
                            { checkOut: { lte: checkOutDate } },
                        ],
                    },
                ],
            },
        });

        const isAvailable = conflictingBookings.length === 0;

        return NextResponse.json({
            success: true,
            data: {
                available: isAvailable,
                conflictingBookings: conflictingBookings.length,
            },
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

        console.error('Error checking availability:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to check availability',
            },
            { status: 500 }
        );
    }
}
