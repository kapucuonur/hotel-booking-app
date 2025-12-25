'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

interface Booking {
    id: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    totalPrice: number;
    status: string;
    room: {
        id: string;
        title: string;
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
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [cancelling, setCancelling] = useState(false);

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

    const openCancelDialog = (booking: Booking) => {
        setSelectedBooking(booking);
        setCancelDialogOpen(true);
    };

    const calculateRefundPolicy = (checkInDate: string) => {
        const checkIn = new Date(checkInDate);
        const now = new Date();
        const hoursUntilCheckIn = (checkIn.getTime() - now.getTime()) / (1000 * 60 * 60);

        if (hoursUntilCheckIn >= 24) {
            return {
                refundable: true,
                percentage: 100,
                message: 'Full refund available',
                icon: CheckCircle2,
                color: 'text-green-600'
            };
        } else if (hoursUntilCheckIn > 0) {
            return {
                refundable: false,
                percentage: 0,
                message: 'No refund - Cancellation within 24 hours of check-in',
                icon: XCircle,
                color: 'text-red-600'
            };
        } else {
            return {
                refundable: false,
                percentage: 0,
                message: 'No refund - Check-in date has passed',
                icon: XCircle,
                color: 'text-red-600'
            };
        }
    };

    const handleConfirmCancel = async () => {
        if (!selectedBooking) return;

        setCancelling(true);
        try {
            const response = await fetch(`/api/bookings/${selectedBooking.id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to cancel booking');
            }

            // Update the booking status in the UI
            setBookings(bookings.map(b =>
                b.id === selectedBooking.id
                    ? { ...b, status: 'CANCELLED' }
                    : b
            ));

            setCancelDialogOpen(false);
            setSelectedBooking(null);

            // Show success message
            setTimeout(() => {
                alert('✅ Booking cancelled successfully!');
            }, 100);
        } catch (err) {
            alert('❌ ' + (err instanceof Error ? err.message : 'Failed to cancel booking'));
        } finally {
            setCancelling(false);
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

    const refundPolicy = selectedBooking ? calculateRefundPolicy(selectedBooking.checkIn) : null;

    return (
        <>
            <main className="min-h-screen py-12 bg-zinc-50 dark:bg-zinc-950">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold tracking-tight mb-8">My Bookings</h1>

                    <div className="space-y-6">
                        {bookings.map((booking) => (
                            <div key={booking.id} className="bg-card border rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row">
                                <div className="relative h-48 md:h-auto md:w-64">
                                    <img
                                        src={booking.room.imageUrl}
                                        alt={booking.room.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="text-xl font-semibold">{booking.room.title}</h3>
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
                                                onClick={() => openCancelDialog(booking)}
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

            {/* Cancellation Policy Dialog */}
            <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-yellow-600" />
                            Cancellation Policy
                        </DialogTitle>
                        <DialogDescription>
                            Please review our cancellation policy before proceeding
                        </DialogDescription>
                    </DialogHeader>

                    {selectedBooking && refundPolicy && (
                        <div className="px-6 py-4 space-y-4">
                            {/* Booking Details */}
                            <div className="bg-muted/50 rounded-lg p-4">
                                <h4 className="font-semibold mb-2">{selectedBooking.room.title}</h4>
                                <div className="text-sm space-y-1 text-muted-foreground">
                                    <p>Check-in: {new Date(selectedBooking.checkIn).toLocaleDateString()}</p>
                                    <p>Total: ${selectedBooking.totalPrice}</p>
                                </div>
                            </div>

                            {/* Refund Policy */}
                            <div className={`border-2 rounded-lg p-4 ${refundPolicy.refundable ? 'border-green-200 bg-green-50 dark:bg-green-950/20' : 'border-red-200 bg-red-50 dark:bg-red-950/20'}`}>
                                <div className="flex items-start gap-3">
                                    <refundPolicy.icon className={`h-5 w-5 mt-0.5 ${refundPolicy.color}`} />
                                    <div className="flex-1">
                                        <h5 className={`font-semibold ${refundPolicy.color}`}>
                                            {refundPolicy.message}
                                        </h5>
                                        {refundPolicy.refundable ? (
                                            <p className="text-sm text-muted-foreground mt-1">
                                                You will receive a full refund of ${selectedBooking.totalPrice} within 5-7 business days.
                                            </p>
                                        ) : (
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Cancellations made within 24 hours of check-in are non-refundable as per our policy.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Policy Details */}
                            <div className="text-xs text-muted-foreground space-y-1 border-t pt-3">
                                <p className="font-semibold">Cancellation Policy:</p>
                                <ul className="list-disc list-inside space-y-1 ml-2">
                                    <li>24+ hours before check-in: 100% refund</li>
                                    <li>Less than 24 hours: No refund</li>
                                    <li>Refunds processed within 5-7 business days</li>
                                </ul>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setCancelDialogOpen(false)}
                            disabled={cancelling}
                        >
                            Keep Booking
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleConfirmCancel}
                            disabled={cancelling}
                        >
                            {cancelling ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Cancelling...
                                </>
                            ) : (
                                'Confirm Cancellation'
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
