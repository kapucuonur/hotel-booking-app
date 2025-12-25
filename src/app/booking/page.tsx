'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { StripeProvider } from '@/components/providers/StripeProvider';
import { PaymentForm } from '@/components/booking/PaymentForm';
import { Loader2 } from 'lucide-react';
import type { RoomDisplay } from '@/lib/types';

export const dynamic = 'force-dynamic';

function BookingContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session, status } = useSession();
    const roomId = searchParams.get('roomId');

    const [room, setRoom] = useState<RoomDisplay | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [bookingId, setBookingId] = useState<string | null>(null);
    const [step, setStep] = useState<'details' | 'payment'>('details');

    // Form state
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [guestFirstName, setGuestFirstName] = useState('');
    const [guestLastName, setGuestLastName] = useState('');
    const [guestEmail, setGuestEmail] = useState('');
    const [guestPhone, setGuestPhone] = useState('');

    // Set email from session when available
    useEffect(() => {
        if (session?.user?.email && !guestEmail) {
            setGuestEmail(session.user.email);
        }
    }, [session, guestEmail]);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/signin?callbackUrl=/booking');
            return;
        }

        if (!roomId) {
            router.push('/rooms');
            return;
        }

        async function fetchRoom() {
            try {
                const response = await fetch(`/api/rooms/${roomId}`);
                if (!response.ok) throw new Error('Room not found');
                const data = await response.json();
                setRoom(data.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load room');
            } finally {
                setLoading(false);
            }
        }

        if (status === 'authenticated') {
            fetchRoom();
        }
    }, [roomId, router, status]);

    const calculateNights = () => {
        if (!checkIn || !checkOut) return 0;
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const diff = end.getTime() - start.getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    const calculateTotal = () => {
        if (!room) return 0;
        return room.price * calculateNights();
    };

    const handleCreateBooking = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!room || !session?.user?.id) return;

        try {
            setLoading(true);
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    roomId: room.id,
                    checkIn,
                    checkOut,
                    guests,
                    guestFirstName,
                    guestLastName,
                    guestEmail,
                    guestPhone,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle specific error cases
                if (response.status === 409) {
                    throw new Error('This room is not available for the selected dates. Please choose different dates.');
                }
                throw new Error(data.error || 'Failed to create booking');
            }

            setBookingId(data.data.id);
            setStep('payment');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to create booking';
            setError(errorMessage);
            // Scroll to top to show error
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setLoading(false);
        }
    };

    const handlePaymentSuccess = () => {
        router.push(`/booking/success?bookingId=${bookingId}`);
    };

    const handlePaymentError = (errorMessage: string) => {
        setError(errorMessage);
        setStep('details'); // Go back to details step on payment error
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (status === 'loading' || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen py-12 bg-zinc-50 dark:bg-zinc-950">
                <div className="container mx-auto px-4 max-w-2xl">
                    <div className="bg-destructive/10 border-2 border-destructive rounded-lg p-6 mb-4">
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                                <svg className="h-5 w-5 text-destructive" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-semibold text-destructive mb-1">Booking Error</h3>
                                <p className="text-sm text-destructive/90">{error}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button onClick={() => { setError(null); router.back(); }} variant="outline">
                            Go Back
                        </Button>
                        <Button onClick={() => setError(null)}>
                            Try Again
                        </Button>
                    </div>
                </div>
            </main>
        );
    }

    if (!room) return null;

    const nights = calculateNights();
    const total = calculateTotal();

    return (
        <main className="min-h-screen py-12 bg-zinc-50 dark:bg-zinc-950">
            <div className="container mx-auto px-4 max-w-2xl">
                <h1 className="text-3xl font-bold mb-8 text-center">Complete Your Booking</h1>

                {/* Room Summary */}
                <div className="bg-card border rounded-lg shadow-sm p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Reservation Summary</h2>
                    <div className="flex gap-4 mb-4">
                        <div className="h-24 w-24 bg-zinc-200 rounded-md overflow-hidden relative">
                            <img src={room.imageUrl} alt={room.title} className="object-cover w-full h-full" />
                        </div>
                        <div>
                            <h3 className="font-semibold">{room.title}</h3>
                            <p className="text-muted-foreground text-sm">{room.type} Room</p>
                            <p className="text-primary font-bold mt-1">
                                ${room.price} <span className="text-muted-foreground font-normal text-sm">/ night</span>
                            </p>
                        </div>
                    </div>

                    {step === 'payment' && checkIn && checkOut && (
                        <div className="bg-secondary/30 p-4 rounded-md text-sm space-y-2">
                            <div className="flex justify-between">
                                <span>Check-in</span>
                                <span className="font-medium">{new Date(checkIn).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Check-out</span>
                                <span className="font-medium">{new Date(checkOut).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Guests</span>
                                <span className="font-medium">{guests}</span>
                            </div>
                            <div className="flex justify-between border-t pt-2 mt-2 font-bold text-base">
                                <span>Total ({nights} {nights === 1 ? 'night' : 'nights'})</span>
                                <span>${total}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Booking Form or Payment */}
                {step === 'details' ? (
                    <form onSubmit={handleCreateBooking} className="space-y-6 bg-card border rounded-lg shadow-sm p-6">
                        {/* Guest Information Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold border-b pb-2">Guest Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="firstName" className="text-sm font-medium">First Name *</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        required
                                        value={guestFirstName}
                                        onChange={(e) => setGuestFirstName(e.target.value)}
                                        placeholder="John"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="lastName" className="text-sm font-medium">Last Name *</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        required
                                        value={guestLastName}
                                        onChange={(e) => setGuestLastName(e.target.value)}
                                        placeholder="Doe"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">Email Address *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        value={guestEmail}
                                        onChange={(e) => setGuestEmail(e.target.value)}
                                        placeholder="john.doe@example.com"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-medium">Phone Number *</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        required
                                        value={guestPhone}
                                        onChange={(e) => setGuestPhone(e.target.value)}
                                        placeholder="+1 (555) 123-4567"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Booking Details Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold border-b pb-2">Booking Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="checkIn" className="text-sm font-medium">Check-in Date *</label>
                                    <input
                                        type="date"
                                        id="checkIn"
                                        required
                                        value={checkIn}
                                        onChange={(e) => setCheckIn(e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="checkOut" className="text-sm font-medium">Check-out Date *</label>
                                    <input
                                        type="date"
                                        id="checkOut"
                                        required
                                        value={checkOut}
                                        onChange={(e) => setCheckOut(e.target.value)}
                                        min={checkIn || new Date().toISOString().split('T')[0]}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="guests" className="text-sm font-medium">Number of Guests *</label>
                                <input
                                    type="number"
                                    id="guests"
                                    required
                                    min="1"
                                    max={room.capacity}
                                    value={guests}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        if (!isNaN(value) && value > 0) {
                                            setGuests(value);
                                        }
                                    }}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />
                                <p className="text-xs text-muted-foreground">Maximum capacity: {room.capacity} guests</p>
                            </div>
                        </div>

                        {nights > 0 && (
                            <div className="p-4 bg-muted rounded-lg">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium">Total for {nights} {nights === 1 ? 'night' : 'nights'}</span>
                                    <span className="text-2xl font-bold">${total}</span>
                                </div>
                            </div>
                        )}

                        <Button type="submit" size="lg" className="w-full text-lg" disabled={loading || nights === 0}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating Booking...
                                </>
                            ) : (
                                'Continue to Payment'
                            )}
                        </Button>
                    </form>
                ) : (
                    <div className="bg-card border rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-semibold mb-6">Payment Details</h2>
                        <StripeProvider>
                            <PaymentForm
                                amount={total}
                                bookingId={bookingId!}
                                onSuccess={handlePaymentSuccess}
                                onError={handlePaymentError}
                            />
                        </StripeProvider>
                    </div>
                )}
            </div>
        </main>
    );
}

export default function BookingPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        }>
            <BookingContent />
        </Suspense>
    );
}
