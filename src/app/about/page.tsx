import Image from "next/image";

export default function AboutPage() {
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "Excellence", description: "We strive for perfection in every service we provide." },
                        { title: "Comfort", description: "Your relaxation is our top priority." },
                        { title: "Sustainability", description: "Eco-friendly practices for a better tomorrow." }
                    ].map((value) => (
                        <div key={value.title} className="p-6 bg-secondary/20 rounded-lg border text-center">
                            <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                            <p className="text-muted-foreground">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
