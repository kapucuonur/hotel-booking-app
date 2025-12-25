'use client';

import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface PaymentFormProps {
    amount: number;
    bookingId: string;
    onSuccess: () => void;
    onError: (error: string) => void;
}

export function PaymentForm({ amount, bookingId, onSuccess, onError }: PaymentFormProps) {
    const stripe = useStripe();
    const elements = useElements();
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setProcessing(true);

        try {
            // Create payment intent
            const response = await fetch('/api/payments/create-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bookingId, amount }),
            });

            const { clientSecret, error: apiError } = await response.json();

            if (apiError) {
                throw new Error(apiError);
            }

            // Confirm payment
            const cardElement = elements.getElement(CardElement);
            if (!cardElement) {
                throw new Error('Card element not found');
            }

            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: cardElement,
                    },
                }
            );

            if (stripeError) {
                throw new Error(stripeError.message);
            }

            if (paymentIntent?.status === 'succeeded') {
                onSuccess();
            }
        } catch (err) {
            onError(err instanceof Error ? err.message : 'Payment failed');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium mb-2">
                    Card Details
                </label>
                <div className="p-4 border rounded-md bg-background">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <span className="text-sm font-medium">Total Amount</span>
                <span className="text-2xl font-bold">${amount.toFixed(2)}</span>
            </div>

            <Button
                type="submit"
                disabled={!stripe || processing}
                className="w-full"
                size="lg"
            >
                {processing ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                    </>
                ) : (
                    `Pay $${amount.toFixed(2)}`
                )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
                Your payment is secured by Stripe. Test card: 4242 4242 4242 4242
            </p>
        </form>
    );
}
