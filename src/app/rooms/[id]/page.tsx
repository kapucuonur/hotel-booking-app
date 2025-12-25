import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { rooms } from "@/lib/data";
import { Check } from "lucide-react";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function RoomDetailPage({ params }: Props) {
    const { id } = await params;
    const room = rooms.find((r) => r.id === id);

    if (!room) {
        notFound();
    }

    return (
        <main className="min-h-screen py-12 bg-background">
            <div className="container mx-auto px-4">
                <Link href="/rooms" className="text-muted-foreground hover:text-primary mb-8 inline-block">
                    &larr; Back to Rooms
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image */}
                    <div className="relative h-[400px] lg:h-[600px] rounded-xl overflow-hidden shadow-lg">
                        <Image
                            src={room.image}
                            alt={room.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Details */}
                    <div className="flex flex-col gap-6">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">{room.name}</h1>
                            <span className="text-2xl font-bold text-primary">
                                ${room.price}<span className="text-base font-normal text-muted-foreground">/night</span>
                            </span>
                        </div>

                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {room.description}
                        </p>

                        <div>
                            <h3 className="text-xl font-semibold mb-4">Amenities</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {room.amenities.map((amenity) => (
                                    <div key={amenity} className="flex items-center gap-2">
                                        <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                                            <Check className="h-3 w-3 text-primary" />
                                        </div>
                                        <span>{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t flex flex-col gap-4">
                            <div className="flex justify-between items-center bg-secondary/50 p-4 rounded-lg">
                                <span className="font-medium">Capacity</span>
                                <span>Up to {room.capacity} Guests</span>
                            </div>

                            <Link href={`/booking?roomId=${room.id}`}>
                                <Button size="lg" className="w-full text-lg h-12">
                                    Book This Room
                                </Button>
                            </Link>
                            <p className="text-xs text-center text-muted-foreground">
                                No payment required today. Free cancellation.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
