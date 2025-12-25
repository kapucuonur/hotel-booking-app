'use client';

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { SearchFilters, FilterState } from "@/components/rooms/SearchFilters";
import type { RoomDisplay } from "@/lib/types";

export default function RoomsPage() {
    const [rooms, setRooms] = useState<RoomDisplay[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<FilterState>({
        minPrice: 0,
        maxPrice: 1000,
        amenities: [],
        capacity: 1,
        type: '',
        sortBy: 'price-asc',
    });

    useEffect(() => {
        fetchRooms();
    }, [filters]);

    async function fetchRooms() {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                minPrice: filters.minPrice.toString(),
                maxPrice: filters.maxPrice.toString(),
                capacity: filters.capacity.toString(),
                sortBy: filters.sortBy,
                ...(filters.type && { type: filters.type }),
                ...(filters.amenities.length > 0 && { amenities: filters.amenities.join(',') }),
            });

            const response = await fetch(`/api/rooms?${params}`);
            if (!response.ok) throw new Error('Failed to fetch rooms');
            const data = await response.json();
            setRooms(data.rooms || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load rooms');
        } finally {
            setLoading(false);
        }
    }

    if (error) {
        return (
            <main className="min-h-screen py-12 bg-zinc-50 dark:bg-zinc-950">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold tracking-tight mb-8">Our Rooms</h1>
                    <div className="text-center py-12">
                        <p className="text-red-500 mb-4">{error}</p>
                        <Button onClick={() => window.location.reload()}>Try Again</Button>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen py-12 bg-zinc-50 dark:bg-zinc-950">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold tracking-tight mb-8">Our Rooms</h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1">
                        <SearchFilters onFilterChange={setFilters} />
                    </div>

                    {/* Rooms Grid */}
                    <div className="lg:col-span-3">
                        {/* Results Count */}
                        <div className="mb-6">
                            <p className="text-muted-foreground">
                                {loading ? 'Loading...' : `${rooms.length} ${rooms.length === 1 ? 'room' : 'rooms'} found`}
                            </p>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="animate-pulse">
                                        <div className="bg-gray-300 dark:bg-gray-700 h-64 rounded-t-lg"></div>
                                        <div className="p-6 bg-card rounded-b-lg">
                                            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                                            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                                            <div className="flex gap-2">
                                                <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded flex-1"></div>
                                                <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded flex-1"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : rooms.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground mb-4">No rooms found matching your criteria</p>
                                <Button onClick={() => setFilters({
                                    minPrice: 0,
                                    maxPrice: 1000,
                                    amenities: [],
                                    capacity: 1,
                                    type: '',
                                    sortBy: 'price-asc',
                                })}>
                                    Clear Filters
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {rooms.map((room) => (
                                    <div key={room.id} className="group overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
                                        <div className="relative h-64 w-full overflow-hidden">
                                            <Image
                                                src={room.imageUrl}
                                                alt={room.title}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-xl font-semibold">{room.title}</h3>
                                                <span className="text-lg font-bold text-primary">
                                                    ${room.price}<span className="text-sm font-normal text-muted-foreground">/night</span>
                                                </span>
                                            </div>
                                            <p className="text-muted-foreground line-clamp-2 mb-4">
                                                {room.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {room.amenities.slice(0, 3).map((amenity) => (
                                                    <span key={amenity} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                                        {amenity}
                                                    </span>
                                                ))}
                                                {room.amenities.length > 3 && (
                                                    <span className="text-xs text-muted-foreground flex items-center">
                                                        +{room.amenities.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex gap-2">
                                                <Link href={`/rooms/${room.id}`} className="flex-1">
                                                    <Button variant="outline" className="w-full">View Details</Button>
                                                </Link>
                                                <Link href={`/booking?roomId=${room.id}`} className="flex-1">
                                                    <Button className="w-full">Book Now</Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
