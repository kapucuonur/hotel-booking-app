'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface Booking {
    id: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    totalPrice: number;
    status: string;
    room: {
        id: string;
        name: string;
        imageUrl: string;
        type: string;
    };
}

export default function MyBookingsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/signin?callbackUrl=/my-bookings');
            return;
        }

        async function fetchBookings() {
            try {
                const response = await fetch('/api/bookings');
                if (!response.ok) throw new Error('Failed to fetch bookings');
                const data = await response.json();
                setBookings(data.data || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load bookings');
            } finally {
                setLoading(false);
            }
        }

        if (status === 'authenticated') {
            fetchBookings();
        }
    }, [status, router]);

    const handleCancel = async (bookingId: string) => {
        if (!confirm('Are you sure you want to cancel this booking?')) return;

        try {
            const response = await fetch(`/api/bookings/${bookingId}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to cancel booking');

            // Refresh bookings
            setBookings(bookings.filter(b => b.id !== bookingId));
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to cancel booking');
        }
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
                <div className="container mx-auto px-4 text-center">
                    <p className="text-red-500 mb-4">{error}</p>
                    <Button onClick={() => router.push('/rooms')}>Browse Rooms</Button>
                </div>
            </main>
        );
    }

    if (bookings.length === 0) {
        return (
            <main className="min-h-screen py-12 bg-zinc-50 dark:bg-zinc-950">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl font-bold mb-4">My Bookings</h1>
                    <div className="p-12 border rounded-lg bg-card max-w-2xl mx-auto">
                        <p className="text-muted-foreground mb-6">You have no active bookings.</p>
                        <Link href="/rooms">
                            <Button>Find a New Room</Button>
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen py-12 bg-zinc-50 dark:bg-zinc-950">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold tracking-tight mb-8">My Bookings</h1>

                <div className="space-y-6">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="bg-card border rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row">
                            <div className="relative h-48 md:h-auto md:w-64">
                                <img
                                    src={booking.room.imageUrl}
                                    alt={booking.room.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-xl font-semibold">{booking.room.name}</h3>
                                            <p className="text-muted-foreground text-sm">
                                                Confirmation #{booking.id.slice(0, 8).toUpperCase()}
                                            </p>
                                        </div>
                                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${booking.status === 'CONFIRMED'
                                            ? 'bg-green-500/15 text-green-700 dark:text-green-400'
                                            : booking.status === 'PENDING'
                                                ? 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-400'
                                                : 'bg-red-500/15 text-red-700 dark:text-red-400'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                                        <div>
                                            <p className="text-muted-foreground">Check-in</p>
                                            <p className="font-medium">{new Date(booking.checkIn).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Check-out</p>
                                            <p className="font-medium">{new Date(booking.checkOut).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Guests</p>
                                            <p className="font-medium">{booking.guests}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Total</p>
                                            <p className="font-medium">${booking.totalPrice}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex gap-3">
                                    <Link href={`/booking?roomId=${booking.room.id}`}>
                                        <Button variant="outline" size="sm">Book Again</Button>
                                    </Link>
                                    {booking.status !== 'CANCELLED' && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleCancel(booking.id)}
                                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                        >
                                            Cancel
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Call to Action */}
                    <div className="text-center py-12 border-t mt-12">
                        <h3 className="text-lg font-medium mb-2">Looking for another getaway?</h3>
                        <p className="text-muted-foreground mb-6">Explore our curated list of luxury rooms.</p>
                        <Link href="/rooms">
                            <Button>Browse Rooms</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
