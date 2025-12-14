
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { rooms } from "@/lib/data";

export default function Home() {
  const featuredRooms = rooms.slice(0, 3);

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full flex items-center justify-center text-center bg-zinc-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="absolute inset-0 z-0">
          {/* Abstract background or placeholder image if real one not available */}
          <Image
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2670&auto=format&fit=crop"
            alt="Hotel Hero"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-20 container px-4 flex flex-col items-center gap-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Find Your Perfect Getaway
          </h1>
          <p className="text-lg md:text-xl text-zinc-200 max-w-2xl">
            Discover luxury, comfort, and unforgettable experiences at LuxStay.
            Book your dream room today.
          </p>
          <div className="flex gap-4">
            <Link href="/rooms">
              <Button size="lg" className="text-lg px-8">
                Browse Rooms
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Rooms</h2>
              <p className="text-muted-foreground">Hand-picked selection for your comfort.</p>
            </div>
            <Link href="/rooms" className="hidden md:block">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.map((room) => (
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
                      <span key={amenity} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                        {amenity}
                      </span>
                    ))}
                    {room.amenities.length > 3 && (
                      <span className="text-xs text-muted-foreground flex items-center">
                        +{room.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                  <Link href={`/rooms/${room.id}`} className="w-full">
                    <Button className="w-full">View Details</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 md:hidden text-center">
            <Link href="/rooms">
              <Button variant="outline" className="w-full">View All Rooms</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
