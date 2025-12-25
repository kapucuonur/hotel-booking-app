'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Loader2 } from 'lucide-react';

export default function BookingSuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const bookingId = searchParams.get('bookingId');

    const [booking, setBooking] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!bookingId) {
            router.push('/');
            return;
        }

        async function fetchBooking() {
            try {
                const response = await fetch(`/api/bookings/${bookingId}`);
                const data = await response.json();
                setBooking(data.booking);
            } catch (error) {
                console.error('Failed to fetch booking:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchBooking();
    }, [bookingId, router]);

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </main>
        );
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
            <div className="max-w-md w-full text-center space-y-6 p-8 bg-card border rounded-xl shadow-lg">
                <div className="flex justify-center">
                    <div className="h-20 w-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
                    </div>
                </div>

                <div>
                    <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
                    <p className="text-muted-foreground">
                        Thank you for choosing LuxStay. Your reservation has been confirmed.
                    </p>
                </div>

                {booking && (
                    <div className="bg-muted p-4 rounded-lg text-left space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Booking ID</span>
                            <span className="font-mono font-medium">{booking.id.slice(0, 8)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Check-in</span>
                            <span className="font-medium">{new Date(booking.checkIn).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Check-out</span>
                            <span className="font-medium">{new Date(booking.checkOut).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Guests</span>
                            <span className="font-medium">{booking.guests}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2 mt-2">
                            <span className="font-semibold">Total Paid</span>
                            <span className="font-bold text-lg">${booking.totalAmount}</span>
                        </div>
                    </div>
                )}

                <div className="pt-6 border-t space-y-3">
                    <Link href="/my-bookings">
                        <Button className="w-full" size="lg">View My Bookings</Button>
                    </Link>
                    <Link href="/">
                        <Button variant="outline" className="w-full" size="lg">Return to Home</Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
