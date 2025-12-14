"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { rooms } from "@/lib/data";
import { useState } from "react";

export default function MyBookingsPage() {
    // Mock data: Simulating that the user booked the first room
    const bookedRoom = rooms[0];
    const [isCancelled, setIsCancelled] = useState(false);

    const handleManage = () => {
        alert("In this demo, please contact support to modify your booking details.");
    };

    const handleCancel = () => {
        if (confirm("Are you sure you want to cancel this booking?")) {
            setIsCancelled(true);
        }
    };

    if (isCancelled) {
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
                    {/* Active Booking Card */}
                    <div className="bg-card border rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row">
                        <div className="relative h-48 md:h-auto md:w-64">
                            <Image
                                src={bookedRoom.imageUrl}
                                alt={bookedRoom.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-6 flex-1 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-xl font-semibold">{bookedRoom.title}</h3>
                                        <p className="text-muted-foreground text-sm">Confirmation #8X29B1</p>
                                    </div>
                                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-500/15 text-green-700 dark:text-green-400">
                                        Confirmed
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                                    <div>
                                        <p className="text-muted-foreground">Check-in</p>
                                        <p className="font-medium">Dec 20, 2024</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Check-out</p>
                                        <p className="font-medium">Dec 22, 2024</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex gap-3">
                                <Button variant="outline" size="sm" onClick={handleManage}>Manage Booking</Button>
                                <Button variant="ghost" size="sm" onClick={handleCancel} className="text-destructive hover:text-destructive hover:bg-destructive/10">Cancel</Button>
                            </div>
                        </div>
                    </div>

                    {/* Empty State / Call to Action */}
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
