import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { rooms } from "@/lib/data";
import { CheckCircle2 } from "lucide-react";

interface Props {
    searchParams: Promise<{
        roomId?: string;
    }>;
}

export default async function BookingPage({ searchParams }: Props) {
    const { roomId } = await searchParams;
    const room = rooms.find((r) => r.id === roomId);

    if (!room) {
        // Ideally we'd show a "select room" state or redirect to rooms
        // For now, redirect if no room selected
        if (!roomId) redirect("/rooms");
        notFound();
    }

    // Server action to handle booking (mock)
    async function bookRoom() {
        "use server";
        redirect("/booking/success");
    }

    return (
        <main className="min-h-screen py-12 bg-zinc-50 dark:bg-zinc-950">
            <div className="container mx-auto px-4 max-w-2xl">
                <h1 className="text-3xl font-bold mb-8 text-center">Complete Your Booking</h1>

                <div className="bg-card border rounded-lg shadow-sm p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Reservation Summary</h2>
                    <div className="flex gap-4 mb-4">
                        <div className="h-24 w-24 bg-zinc-200 rounded-md overflow-hidden relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={room.imageUrl} alt={room.title} className="object-cover w-full h-full" />
                        </div>
                        <div>
                            <h3 className="font-semibold">{room.title}</h3>
                            <p className="text-muted-foreground text-sm">{room.type} Room</p>
                            <p className="text-primary font-bold mt-1">${room.price} <span className="text-muted-foreground font-normal text-sm">/ night</span></p>
                        </div>
                    </div>
                    <div className="bg-secondary/30 p-4 rounded-md text-sm space-y-2">
                        <div className="flex justify-between">
                            <span>Check-in</span>
                            <span className="font-medium">Dec 20, 2024</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Check-out</span>
                            <span className="font-medium">Dec 22, 2024</span>
                        </div>
                        <div className="flex justify-between border-t pt-2 mt-2 font-bold text-base">
                            <span>Total (2 nights)</span>
                            <span>${room.price * 2}</span>
                        </div>
                    </div>
                </div>

                <form action={bookRoom} className="space-y-6 bg-card border rounded-lg shadow-sm p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                            <input type="text" id="firstName" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="John" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                            <input type="text" id="lastName" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Doe" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                        <input type="email" id="email" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="john@example.com" />
                    </div>

                    <Button size="lg" className="w-full text-lg">
                        Confirm Booking
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                        By clicking confirm, you agree to our terms and conditions.
                    </p>
                </form>
            </div>
        </main>
    );
}
