import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-08-27.basil',
    typescript: true,
});

export const formatAmountForStripe = (amount: number, currency: string): number => {
    // Stripe expects amounts in the smallest currency unit (cents for USD)
    return Math.round(amount * 100);
};

export const formatAmountFromStripe = (amount: number): number => {
    // Convert from cents back to dollars
    return amount / 100;
};
