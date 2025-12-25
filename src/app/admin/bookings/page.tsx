'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface Booking {
    id: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    totalPrice: number;
    status: string;
    user: { name: string | null; email: string | null };
    room: { title: string };
}

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchBookings();
    }, []);

    async function fetchBookings() {
        try {
            const response = await fetch('/api/bookings');
            const data = await response.json();
            if (data.success) {
                setBookings(data.bookings || []);
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
        }
    }

    async function updateBookingStatus(id: string, status: string) {
        try {
            const response = await fetch(`/api/bookings/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });

            if (response.ok) {
                fetchBookings(); // Refresh list
            }
        } catch (error) {
            console.error('Error updating booking:', error);
        }
    }

    const filteredBookings = bookings.filter(b =>
        filter === 'all' || b.status === filter
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Bookings Management</h2>
                <div className="flex gap-2">
                    {['all', 'PENDING', 'CONFIRMED', 'CANCELLED'].map(status => (
                        <Button
                            key={status}
                            variant={filter === status ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilter(status)}
                        >
                            {status === 'all' ? 'All' : status}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="bg-card border rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-muted">
                        <tr>
                            <th className="text-left p-4">Guest</th>
                            <th className="text-left p-4">Room</th>
                            <th className="text-left p-4">Check-in</th>
                            <th className="text-left p-4">Check-out</th>
                            <th className="text-left p-4">Guests</th>
                            <th className="text-left p-4">Price</th>
                            <th className="text-left p-4">Status</th>
                            <th className="text-left p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBookings.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="text-center py-8 text-muted-foreground">
                                    No bookings found
                                </td>
                            </tr>
                        ) : (
                            filteredBookings.map((booking) => (
                                <tr key={booking.id} className="border-t">
                                    <td className="p-4">
                                        <div className="font-medium">{booking.user.name || 'Guest'}</div>
                                        <div className="text-sm text-muted-foreground">{booking.user.email}</div>
                                    </td>
                                    <td className="p-4">{booking.room.title}</td>
                                    <td className="p-4">{new Date(booking.checkIn).toLocaleDateString()}</td>
                                    <td className="p-4">{new Date(booking.checkOut).toLocaleDateString()}</td>
                                    <td className="p-4">{booking.guests}</td>
                                    <td className="p-4 font-semibold">${booking.totalPrice}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                                                booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-red-100 text-red-700'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        {booking.status === 'PENDING' && (
                                            <Button
                                                size="sm"
                                                onClick={() => updateBookingStatus(booking.id, 'CONFIRMED')}
                                            >
                                                Confirm
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
