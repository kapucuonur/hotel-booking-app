"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const values = [
    {
        title: "Excellence",
        description: "We strive for perfection in every service we provide.",
        details: "From our 24/7 concierge service to our Michelin-starred dining, excellence is not just a goal, but our standard. We meticulously train our staff to anticipate your needs before you even voice them."
    },
    {
        title: "Comfort",
        description: "Your relaxation is our top priority.",
        details: "Experience the ultimate sleep with our custom-designed mattresses and premium Egyptian cotton linens. Every room is soundproofed and climate-controlled to ensure your personal oasis of calm."
    },
    {
        title: "Sustainability",
        description: "Eco-friendly practices for a better tomorrow.",
        details: "We are committed to a zero-waste future. Our hotel runs on 100% renewable energy, utilizes rainwater harvesting, and sources all food ingredients from local, organic farmers."
    }
];

export default function AboutPage() {
    const [expandedValue, setExpandedValue] = useState<string | null>(null);

    return (
        <main className="min-h-screen py-20 bg-background">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">About LuxStay</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Redefining luxury hospitality since 2024.
                    </p>
                </div>

                {/* Story Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                    <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-lg">
                        <Image
                            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2670&auto=format&fit=crop"
                            alt="Hotel Lobby"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold">Our Story</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Founded with a vision to provide travelers with an unforgettable experience, LuxStay has quickly become a beacon of comfort and elegance.
                            We believe that a hotel stay should be more than just a place to sleep—it should be a memory to cherish.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            From our carefully curated room designs to our world-class amenities, every detail is crafted to ensure your absolute satisfaction.
                        </p>
                    </div>
                </div>

                {/* Values Section */}
                <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {values.map((value) => (
                        <div
                            key={value.title}
                            onClick={() => setExpandedValue(expandedValue === value.title ? null : value.title)}
                            className={cn(
                                "p-6 bg-card rounded-lg border cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/50",
                                expandedValue === value.title ? "ring-2 ring-primary" : ""
                            )}
                        >
                            <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                            <p className="text-muted-foreground mb-4">{value.description}</p>

                            <div className={cn(
                                "grid transition-all duration-300 overflow-hidden",
                                expandedValue === value.title ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                            )}>
                                <div className="min-h-0 text-sm text-foreground/90 border-t pt-4 mt-2">
                                    {value.details}
                                </div>
                            </div>
                            <p className={cn("text-xs text-primary font-medium mt-2", expandedValue === value.title ? "hidden" : "block")}>
                                Click to read more &darr;
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
