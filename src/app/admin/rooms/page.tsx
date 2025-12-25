import { prisma } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function AdminRoomsPage() {
    const rooms = await prisma.room.findMany({
        include: {
            hotel: { select: { name: true } },
            _count: { select: { bookings: true } },
        },
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Rooms Management</h2>
                <Button>Add New Room</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map((room) => (
                    <div key={room.id} className="bg-card border rounded-lg overflow-hidden">
                        <div className="relative h-48">
                            <Image
                                src={room.imageUrl}
                                alt={room.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-4 space-y-3">
                            <div>
                                <h3 className="font-semibold text-lg">{room.title}</h3>
                                <p className="text-sm text-muted-foreground">{room.hotel.name}</p>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Price:</span>
                                <span className="font-semibold">${room.price}/night</span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Capacity:</span>
                                <span>{room.capacity} guests</span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Total Bookings:</span>
                                <span className="font-semibold">{room._count.bookings}</span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Type:</span>
                                <span className="capitalize">{room.type}</span>
                            </div>

                            <div className="flex gap-2 pt-2 border-t">
                                <Link href={`/rooms/${room.id}`} className="flex-1">
                                    <Button variant="outline" size="sm" className="w-full">
                                        View
                                    </Button>
                                </Link>
                                <Button variant="outline" size="sm" className="flex-1">
                                    Edit
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {rooms.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    <p>No rooms found. Add your first room to get started.</p>
                </div>
            )}
        </div>
    );
}
