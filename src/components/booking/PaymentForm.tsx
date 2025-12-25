'use client';

import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Loader2, Lock, CreditCard, Shield } from 'lucide-react';

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

            const responseData = await response.json();

            if (!response.ok || !responseData.success) {
                throw new Error(responseData.error || 'Failed to create payment intent');
            }

            const { clientSecret } = responseData.data;

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
            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg">
                <Shield className="h-5 w-5 text-green-600 dark:text-green-500" />
                <span className="text-sm font-medium text-green-700 dark:text-green-400">
                    Secure Payment Protected by Stripe
                </span>
            </div>

            {/* Card Details Section */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <label className="text-base font-semibold">Card Information</label>
                </div>

                <div className="relative">
                    <div className="p-4 border-2 border-input rounded-lg bg-background hover:border-primary/50 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: 'hsl(var(--foreground))',
                                        fontFamily: 'system-ui, -apple-system, sans-serif',
                                        '::placeholder': {
                                            color: 'hsl(var(--muted-foreground))',
                                        },
                                        iconColor: 'hsl(var(--primary))',
                                    },
                                    invalid: {
                                        color: 'hsl(var(--destructive))',
                                        iconColor: 'hsl(var(--destructive))',
                                    },
                                    complete: {
                                        iconColor: 'hsl(var(--primary))',
                                    },
                                },
                            }}
                        />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                        <Lock className="h-3 w-3" />
                        Your card details are encrypted and secure
                    </p>
                </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 border-2 border-primary/20 rounded-xl p-6 space-y-3">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Booking Total</span>
                    <span>${amount.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Processing Fee</span>
                    <span>$0.00</span>
                </div>
                <div className="border-t border-primary/20 pt-3 flex items-center justify-between">
                    <span className="text-lg font-semibold">Total Amount</span>
                    <span className="text-3xl font-bold text-primary">${amount.toFixed(2)}</span>
                </div>
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                disabled={!stripe || processing}
                className="w-full h-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                size="lg"
            >
                {processing ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing Payment...
                    </>
                ) : (
                    <>
                        <Lock className="mr-2 h-5 w-5" />
                        Pay ${amount.toFixed(2)} Securely
                    </>
                )}
            </Button>

            {/* Trust Indicators */}
            <div className="space-y-2">
                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        <span>SSL Encrypted</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Lock className="h-3 w-3" />
                        <span>PCI Compliant</span>
                    </div>
                </div>
                <p className="text-xs text-center text-muted-foreground">
                    <strong>Test Mode:</strong> Use card 4242 4242 4242 4242 with any future date and CVC
                </p>
            </div>
        </form>
    );
}
