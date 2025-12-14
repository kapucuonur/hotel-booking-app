import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { rooms } from "@/lib/data";

export default function RoomsPage() {
    return (
        <main className="min-h-screen py-12 bg-zinc-50 dark:bg-zinc-950">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold tracking-tight mb-8">Our Rooms</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            </div>
        </main>
    );
}
