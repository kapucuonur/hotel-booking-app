import { prisma } from '@/lib/db';
import { DollarSign, Calendar, Hotel, TrendingUp } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getStats() {
    const [totalBookings, totalRevenue, totalRooms, recentBookings] = await Promise.all([
        prisma.booking.count(),
        prisma.booking.aggregate({
            _sum: { totalPrice: true },
            where: { status: 'CONFIRMED' },
        }),
        prisma.room.count(),
        prisma.booking.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: {
                user: { select: { name: true, email: true } },
                room: { select: { title: true } },
            },
        }),
    ]);

    return {
        totalBookings,
        totalRevenue: totalRevenue._sum.totalPrice || 0,
        totalRooms,
        recentBookings,
    };
}

export default async function AdminDashboard() {
    const stats = await getStats();

    const statCards = [
        {
            title: 'Total Bookings',
            value: stats.totalBookings,
            icon: Calendar,
            color: 'text-blue-600',
        },
        {
            title: 'Total Revenue',
            value: `$${stats.totalRevenue.toFixed(2)}`,
            icon: DollarSign,
            color: 'text-green-600',
        },
        {
            title: 'Total Rooms',
            value: stats.totalRooms,
            icon: Hotel,
            color: 'text-purple-600',
        },
        {
            title: 'Avg Booking Value',
            value: stats.totalBookings > 0 ? `$${(stats.totalRevenue / stats.totalBookings).toFixed(2)}` : '$0',
            icon: TrendingUp,
            color: 'text-orange-600',
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold mb-2">Dashboard Overview</h2>
                <p className="text-muted-foreground">Welcome to your admin dashboard</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.title} className="bg-card border rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm text-muted-foreground">{stat.title}</span>
                                <Icon className={`h-5 w-5 ${stat.color}`} />
                            </div>
                            <div className="text-3xl font-bold">{stat.value}</div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Bookings */}
            <div className="bg-card border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Recent Bookings</h3>
                <div className="space-y-4">
                    {stats.recentBookings.length === 0 ? (
                        <p className="text-muted-foreground text-center py-8">No bookings yet</p>
                    ) : (
                        stats.recentBookings.map((booking) => (
                            <div key={booking.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                                <div>
                                    <div className="font-medium">{booking.user.name || 'Guest'}</div>
                                    <div className="text-sm text-muted-foreground">{booking.room.title}</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-semibold">${booking.totalPrice}</div>
                                    <div className="text-sm text-muted-foreground">
                                        {new Date(booking.checkIn).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
