import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { PriceComparison } from "@/components/room/PriceComparison";
import { TransportationInfo } from "@/components/room/TransportationInfo";
import { NearbyPlaces } from "@/components/room/NearbyPlaces";
import { TravelTips } from "@/components/room/TravelTips";
import { prisma } from "@/lib/db";
import { Check } from "lucide-react";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function RoomDetailPage({ params }: Props) {
    const { id } = await params;

    const room = await prisma.room.findUnique({
        where: { id },
        include: {
            hotel: true,
        },
    });

    if (!room) {
        notFound();
    }

    const tabs = [
        {
            id: 'overview',
            label: 'Overview',
            content: (
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">About This Room</h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {room.description}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-4">Amenities</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {room.amenities.map((amenity: string) => (
                                <div key={amenity} className="flex items-center gap-2">
                                    <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                                        <Check className="h-3 w-3 text-primary" />
                                    </div>
                                    <span>{amenity}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="bg-secondary/50 p-4 rounded-lg">
                            <span className="text-sm text-muted-foreground">Capacity</span>
                            <div className="text-xl font-semibold">Up to {room.capacity} Guests</div>
                        </div>
                        <div className="bg-secondary/50 p-4 rounded-lg">
                            <span className="text-sm text-muted-foreground">Room Size</span>
                            <div className="text-xl font-semibold">{room.size} m²</div>
                        </div>
                    </div>

                    {/* Price Comparison */}
                    <div className="pt-6">
                        <PriceComparison
                            hotelName={room.hotel.name}
                            city={room.hotel.city}
                            currentPrice={room.price}
                        />
                    </div>
                </div>
            ),
        },
        {
            id: 'location',
            label: 'Location & Transport',
            content: (
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold mb-2">{room.hotel.name}</h3>
                        <p className="text-muted-foreground">{room.hotel.address}, {room.hotel.city}, {room.hotel.country}</p>
                    </div>

                    <TransportationInfo
                        hotelName={room.hotel.name}
                        address={room.hotel.address}
                        city={room.hotel.city}
                        latitude={room.hotel.latitude || undefined}
                        longitude={room.hotel.longitude || undefined}
                        nearestAirport={room.hotel.nearestAirport || undefined}
                        airportDistance={room.hotel.airportDistance || undefined}
                        transportationInfo={room.hotel.transportationInfo as any}
                    />

                    <NearbyPlaces
                        latitude={room.hotel.latitude || undefined}
                        longitude={room.hotel.longitude || undefined}
                        city={room.hotel.city}
                    />
                </div>
            ),
        },
        {
            id: 'tips',
            label: 'Travel Tips',
            content: (
                <TravelTips
                    city={room.hotel.city}
                    country={room.hotel.country}
                    localInfo={room.hotel.localInfo as any}
                />
            ),
        },
    ];

    return (
        <main className="min-h-screen py-12 bg-zinc-50 dark:bg-zinc-950">
            <div className="container mx-auto px-4">
                <Link href="/rooms" className="text-muted-foreground hover:text-primary mb-8 inline-block">
                    ← Back to Rooms
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Image and Quick Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Image */}
                        <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-lg">
                            <Image
                                src={room.imageUrl}
                                alt={room.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Hotel Info */}
                        <div className="bg-card border rounded-lg p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold mb-1">{room.title}</h1>
                                    <p className="text-muted-foreground">{room.hotel.name}</p>
                                    <p className="text-sm text-muted-foreground">{room.hotel.city}, {room.hotel.country}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-primary">
                                        ${room.price}
                                    </div>
                                    <div className="text-sm text-muted-foreground">per night</div>
                                </div>
                            </div>

                            {room.hotel.rating > 0 && (
                                <div className="flex items-center gap-2 pt-4 border-t">
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <span key={i} className={i < Math.floor(room.hotel.rating) ? 'text-yellow-500' : 'text-gray-300'}>
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                    <span className="text-sm font-medium">{room.hotel.rating.toFixed(1)}</span>
                                    <span className="text-sm text-muted-foreground">Hotel Rating</span>
                                </div>
                            )}
                        </div>

                        {/* Tabs */}
                        <div className="bg-card border rounded-lg p-6">
                            <Tabs tabs={tabs} defaultTab="overview" />
                        </div>
                    </div>

                    {/* Right Column - Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 bg-card border rounded-lg p-6 shadow-lg space-y-6">
                            <div>
                                <div className="text-2xl font-bold text-primary mb-1">
                                    ${room.price}
                                    <span className="text-base font-normal text-muted-foreground">/night</span>
                                </div>
                                <p className="text-sm text-muted-foreground">Best price guarantee</p>
                            </div>

                            <div className="space-y-3 py-4 border-y">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Room Type</span>
                                    <span className="font-medium capitalize">{room.type}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Max Guests</span>
                                    <span className="font-medium">{room.capacity} people</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Room Size</span>
                                    <span className="font-medium">{room.size} m²</span>
                                </div>
                            </div>

                            <Link href={`/booking?roomId=${room.id}`}>
                                <Button size="lg" className="w-full text-lg h-12">
                                    Book This Room
                                </Button>
                            </Link>

                            <div className="space-y-2 text-xs text-muted-foreground">
                                <p className="flex items-center gap-2">
                                    <Check className="h-3 w-3 text-green-600" />
                                    No payment required today
                                </p>
                                <p className="flex items-center gap-2">
                                    <Check className="h-3 w-3 text-green-600" />
                                    Free cancellation (24h+ before check-in)
                                </p>
                                <p className="flex items-center gap-2">
                                    <Check className="h-3 w-3 text-green-600" />
                                    Instant confirmation
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
