import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth.config';
import { prisma } from '@/lib/db';

interface RouteParams {
    params: Promise<{
        id: string;
    }>;
}

// GET /api/bookings/[id] - Fetch single booking
export async function GET(request: NextRequest, { params }: RouteParams) {
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

        const { id } = await params;

        const booking = await prisma.booking.findUnique({
            where: { id },
            include: {
                room: {
                    include: {
                        hotel: true,
                    },
                },
                payment: true,
                user: true,
            },
        });

        if (!booking) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Booking not found',
                },
                { status: 404 }
            );
        }

        // Verify user owns this booking
        if (booking.user.email !== session.user.email) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Forbidden',
                },
                { status: 403 }
            );
        }

        return NextResponse.json({
            success: true,
            data: booking,
        });
    } catch (error) {
        console.error('Error fetching booking:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch booking',
            },
            { status: 500 }
        );
    }
}

// DELETE /api/bookings/[id] - Cancel booking
export async function DELETE(request: NextRequest, { params }: RouteParams) {
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

        const { id } = await params;

        const booking = await prisma.booking.findUnique({
            where: { id },
            include: {
                user: true,
            },
        });

        if (!booking) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Booking not found',
                },
                { status: 404 }
            );
        }

        // Verify user owns this booking
        if (booking.user.email !== session.user.email) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Forbidden',
                },
                { status: 403 }
            );
        }

        // Update booking status to cancelled
        const updatedBooking = await prisma.booking.update({
            where: { id },
            data: {
                status: 'CANCELLED',
            },
        });

        return NextResponse.json({
            success: true,
            data: updatedBooking,
            message: 'Booking cancelled successfully',
        });
    } catch (error) {
        console.error('Error cancelling booking:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to cancel booking',
            },
            { status: 500 }
        );
    }
}
