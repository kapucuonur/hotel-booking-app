import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const lat = searchParams.get('lat');
        const lng = searchParams.get('lng');

        if (!lat || !lng) {
            return NextResponse.json(
                { success: false, error: 'Latitude and longitude are required' },
                { status: 400 }
            );
        }

        const apiKey = process.env.GOOGLE_PLACES_API_KEY;

        if (!apiKey) {
            // Return mock data if API key not configured
            return NextResponse.json({
                success: true,
                data: {
                    restaurants: [
                        { name: 'Ocean View Restaurant', type: 'restaurant', distance: '0.3 km', rating: 4.5 },
                        { name: 'Cafe Sunrise', type: 'cafe', distance: '0.5 km', rating: 4.2 },
                        { name: 'The Grill House', type: 'restaurant', distance: '0.8 km', rating: 4.7 },
                    ],
                    attractions: [
                        { name: 'City Museum', type: 'museum', distance: '1.2 km', rating: 4.6 },
                        { name: 'Central Park', type: 'park', distance: '0.7 km', rating: 4.8 },
                        { name: 'Art Gallery', type: 'gallery', distance: '1.5 km', rating: 4.4 },
                    ],
                    shopping: [
                        { name: 'Downtown Mall', type: 'shopping_mall', distance: '1.0 km', rating: 4.3 },
                        { name: 'Local Market', type: 'market', distance: '0.6 km', rating: 4.5 },
                    ],
                    healthcare: [
                        { name: 'City Hospital', type: 'hospital', distance: '2.0 km', rating: 4.1 },
                        { name: 'Pharmacy Plus', type: 'pharmacy', distance: '0.4 km', rating: 4.4 },
                    ],
                    entertainment: [
                        { name: 'Cinema Complex', type: 'movie_theater', distance: '1.3 km', rating: 4.5 },
                        { name: 'Live Music Venue', type: 'night_club', distance: '0.9 km', rating: 4.3 },
                    ],
                },
            });
        }

        // In a real implementation, you would call Google Places API here
        // For now, return mock data
        return NextResponse.json({
            success: true,
            data: {
                restaurants: [
                    { name: 'Ocean View Restaurant', type: 'restaurant', distance: '0.3 km', rating: 4.5 },
                    { name: 'Cafe Sunrise', type: 'cafe', distance: '0.5 km', rating: 4.2 },
                ],
                attractions: [
                    { name: 'City Museum', type: 'museum', distance: '1.2 km', rating: 4.6 },
                    { name: 'Central Park', type: 'park', distance: '0.7 km', rating: 4.8 },
                ],
                shopping: [
                    { name: 'Downtown Mall', type: 'shopping_mall', distance: '1.0 km', rating: 4.3 },
                ],
                healthcare: [
                    { name: 'City Hospital', type: 'hospital', distance: '2.0 km', rating: 4.1 },
                ],
                entertainment: [
                    { name: 'Cinema Complex', type: 'movie_theater', distance: '1.3 km', rating: 4.5 },
                ],
            },
        });
    } catch (error) {
        console.error('Error fetching places:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch nearby places' },
            { status: 500 }
        );
    }
}
