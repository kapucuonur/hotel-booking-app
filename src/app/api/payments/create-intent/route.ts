import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth.config';
import { prisma } from '@/lib/db';
import { stripe, formatAmountForStripe } from '@/lib/stripe';
import { z } from 'zod';

const createPaymentIntentSchema = z.object({
    bookingId: z.string(),
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

        const body = await request.json();
        const { bookingId } = createPaymentIntentSchema.parse(body);

        // Fetch booking
        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
            include: {
                user: true,
                room: true,
                payment: true,
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

        // Check if payment already exists
        if (booking.payment) {
            if (booking.payment.status === 'SUCCEEDED') {
                return NextResponse.json(
                    {
                        success: false,
                        error: 'Payment already completed',
                    },
                    { status: 400 }
                );
            }

            // Return existing payment intent
            return NextResponse.json({
                success: true,
                data: {
                    clientSecret: booking.payment.stripeClientSecret,
                    paymentId: booking.payment.id,
                },
            });
        }

        // Create Stripe PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: formatAmountForStripe(booking.totalPrice, 'usd'),
            currency: 'usd',
            metadata: {
                bookingId: booking.id,
                userId: booking.userId,
                roomName: booking.room.name,
            },
            automatic_payment_methods: {
                enabled: true,
            },
        });

        // Create payment record
        const payment = await prisma.payment.create({
            data: {
                bookingId: booking.id,
                amount: booking.totalPrice,
                currency: 'usd',
                status: 'PENDING',
                stripePaymentId: paymentIntent.id,
                stripeClientSecret: paymentIntent.client_secret,
            },
        });

        return NextResponse.json({
            success: true,
            data: {
                clientSecret: paymentIntent.client_secret,
                paymentId: payment.id,
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

        console.error('Error creating payment intent:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to create payment intent',
            },
            { status: 500 }
        );
    }
}
