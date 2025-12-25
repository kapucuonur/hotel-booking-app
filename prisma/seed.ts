import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    // Create a hotel
    const hotel = await prisma.hotel.upsert({
        where: { id: 'luxstay-main' },
        update: {},
        create: {
            id: 'luxstay-main',
            name: 'LuxStay Grand Hotel',
            description: 'A premium luxury hotel offering world-class amenities and exceptional service in the heart of the city.',
            address: '123 Luxury Avenue',
            city: 'Miami',
            country: 'USA',
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2670&auto=format&fit=crop',
        },
    });

    console.log('✅ Created hotel:', hotel.name);

    // Create rooms based on existing mock data
    const roomsData = [
        {
            id: '1',
            name: 'Deluxe Ocean View',
            description: 'Wake up to the sound of the ocean in this spacious deluxe room featuring a private balcony and premium amenities.',
            type: 'deluxe',
            price: 299,
            capacity: 2,
            size: 45,
            image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2698&auto=format&fit=crop',
            amenities: ['Ocean View', 'King Bed', 'Free Wi-Fi', 'Balcony', 'Mini Bar'],
        },
        {
            id: '2',
            name: 'Executive Suite',
            description: 'Experience ultimate luxury in our executive suite with separate living area, workspace, and city views.',
            type: 'suite',
            price: 450,
            capacity: 3,
            size: 75,
            image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2670&auto=format&fit=crop',
            amenities: ['City View', 'Living Room', 'Workspace', 'Jacuzzi', 'Butler Service'],
        },
        {
            id: '3',
            name: 'Standard Cozy Room',
            description: 'Perfect for solo travelers or couples, our standard room offers comfort and style at an affordable rate.',
            type: 'standard',
            price: 150,
            capacity: 2,
            size: 30,
            image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2674&auto=format&fit=crop',
            amenities: ['Queen Bed', 'Smart TV', 'Coffee Maker', 'Rain Shower'],
        },
        {
            id: '4',
            name: 'Family Garden Suite',
            description: 'Spacious suite with direct access to the hotel gardens, perfect for families with children.',
            type: 'suite',
            price: 380,
            capacity: 4,
            size: 90,
            image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2670&auto=format&fit=crop',
            amenities: ['Garden Access', '2 Bedrooms', 'Kitchenette', 'Play Area'],
        },
        {
            id: '5',
            name: 'Penthouse Skyline View',
            description: 'Top-floor luxury penthouse offering panoramic city views, private terrace, and exclusive VIP concierge service.',
            type: 'suite',
            price: 850,
            capacity: 2,
            size: 120,
            image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2574&auto=format&fit=crop',
            amenities: ['Panoramic View', 'Private Terrace', 'VIP Service', 'Jacuzzi', 'King Bed'],
        },
        {
            id: '6',
            name: 'Budget Solo Room',
            description: 'Compact and cozy room designed for the solo traveler who needs a comfortable base to explore the city.',
            type: 'standard',
            price: 99,
            capacity: 1,
            size: 20,
            image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2670&auto=format&fit=crop',
            amenities: ['Single Bed', 'Free Wi-Fi', 'Work Desk', 'Compact Bath'],
        },
        {
            id: '7',
            name: 'Double Deluxe Twin',
            description: 'Spacious room with two queen beds, ideal for friends or colleagues traveling together.',
            type: 'deluxe',
            price: 220,
            capacity: 4,
            size: 50,
            image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2670&auto=format&fit=crop',
            amenities: ['2 Queen Beds', 'City View', 'Smart TV', 'Mini Fridge'],
        },
        {
            id: '8',
            name: 'Oceanfront Villa',
            description: 'An exclusive detached villa steps away from the beach, featuring a private pool and outdoor dining area.',
            type: 'suite',
            price: 1200,
            capacity: 6,
            size: 200,
            image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2525&auto=format&fit=crop',
            amenities: ['Private Pool', 'Beach Access', 'Full Kitchen', '3 Bedrooms', 'BBQ Grill'],
        },
    ];

    for (const roomData of roomsData) {
        const room = await prisma.room.upsert({
            where: { id: roomData.id },
            update: {},
            create: {
                ...roomData,
                hotelId: hotel.id,
            },
        });
        console.log('✅ Created room:', room.name);
    }

    console.log('🎉 Database seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
