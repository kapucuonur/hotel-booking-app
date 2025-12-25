import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/db';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
        return NextResponse.json(
            {
                success: false,
                error: 'Missing stripe-signature header',
            },
            { status: 400 }
        );
    }

    let event: Stripe.Event;

    try {
        // Verify webhook signature
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error) {
        console.error('Webhook signature verification failed:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Invalid signature',
            },
            { status: 400 }
        );
    }

    // Handle the event
    try {
        switch (event.type) {
            case 'payment_intent.succeeded': {
                const paymentIntent = event.data.object as Stripe.PaymentIntent;

                // Update payment status
                const payment = await prisma.payment.findFirst({
                    where: { stripePaymentId: paymentIntent.id },
                    include: { booking: true },
                });

                if (payment) {
                    await prisma.payment.update({
                        where: { id: payment.id },
                        data: { status: 'SUCCEEDED' },
                    });

                    // Update booking status to confirmed
                    await prisma.booking.update({
                        where: { id: payment.bookingId },
                        data: { status: 'CONFIRMED' },
                    });

                    console.log(`Payment succeeded for booking ${payment.bookingId}`);
                }
                break;
            }

            case 'payment_intent.payment_failed': {
                const paymentIntent = event.data.object as Stripe.PaymentIntent;

                const payment = await prisma.payment.findFirst({
                    where: { stripePaymentId: paymentIntent.id },
                });

                if (payment) {
                    await prisma.payment.update({
                        where: { id: payment.id },
                        data: { status: 'FAILED' },
                    });

                    console.log(`Payment failed for booking ${payment.bookingId}`);
                }
                break;
            }

            case 'payment_intent.processing': {
                const paymentIntent = event.data.object as Stripe.PaymentIntent;

                const payment = await prisma.payment.findFirst({
                    where: { stripePaymentId: paymentIntent.id },
                });

                if (payment) {
                    await prisma.payment.update({
                        where: { id: payment.id },
                        data: { status: 'PROCESSING' },
                    });
                }
                break;
            }

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return NextResponse.json({
            success: true,
            received: true,
        });
    } catch (error) {
        console.error('Error processing webhook:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Webhook processing failed',
            },
            { status: 500 }
        );
    }
}
