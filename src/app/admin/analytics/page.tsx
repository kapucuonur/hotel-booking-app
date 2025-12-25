import { prisma } from '@/lib/db';
import { TrendingUp, Calendar, DollarSign } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getAnalytics() {
    const [bookingsByMonth, topRooms, revenueByStatus] = await Promise.all([
        // Bookings by month (last 6 months)
        prisma.booking.groupBy({
            by: ['createdAt'],
            _count: true,
            orderBy: { createdAt: 'desc' },
            take: 6,
        }),
        // Top performing rooms
        prisma.room.findMany({
            include: {
                _count: { select: { bookings: true } },
                bookings: {
                    select: { totalPrice: true },
                    where: { status: 'CONFIRMED' },
                },
            },
            orderBy: {
                bookings: { _count: 'desc' },
            },
            take: 5,
        }),
        // Revenue by status
        prisma.booking.groupBy({
            by: ['status'],
            _sum: { totalPrice: true },
            _count: true,
        }),
    ]);

    return {
        bookingsByMonth,
        topRooms: topRooms.map(room => ({
            ...room,
            totalRevenue: room.bookings.reduce((sum, b) => sum + b.totalPrice, 0),
        })),
        revenueByStatus,
    };
}

export default async function AdminAnalyticsPage() {
    const analytics = await getAnalytics();

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold mb-2">Analytics & Insights</h2>
                <p className="text-muted-foreground">Track your business performance</p>
            </div>

            {/* Revenue by Status */}
            <div className="bg-card border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    Revenue by Status
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {analytics.revenueByStatus.map((item) => (
                        <div key={item.status} className="p-4 bg-muted/50 rounded-lg">
                            <div className="text-sm text-muted-foreground mb-1">{item.status}</div>
                            <div className="text-2xl font-bold">${item._sum.totalPrice?.toFixed(2) || '0.00'}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                                {item._count} {item._count === 1 ? 'booking' : 'bookings'}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Top Performing Rooms */}
            <div className="bg-card border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Top Performing Rooms
                </h3>
                <div className="space-y-3">
                    {analytics.topRooms.map((room, index) => (
                        <div key={room.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                                    #{index + 1}
                                </div>
                                <div>
                                    <div className="font-medium">{room.title}</div>
                                    <div className="text-sm text-muted-foreground">
                                        {room._count.bookings} bookings
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-semibold text-green-600">
                                    ${room.totalRevenue.toFixed(2)}
                                </div>
                                <div className="text-xs text-muted-foreground">Total Revenue</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Booking Trends */}
            <div className="bg-card border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    Recent Booking Activity
                </h3>
                <div className="text-center py-8 text-muted-foreground">
                    <p className="mb-2">📊 Chart visualization coming soon</p>
                    <p className="text-sm">Install Chart.js for interactive graphs</p>
                </div>
            </div>
        </div>
    );
}
