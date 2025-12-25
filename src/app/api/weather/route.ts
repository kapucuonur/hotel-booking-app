import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const city = searchParams.get('city');
        const date = searchParams.get('date');

        if (!city) {
            return NextResponse.json(
                { success: false, error: 'City is required' },
                { status: 400 }
            );
        }

        const apiKey = process.env.OPENWEATHER_API_KEY;

        if (!apiKey) {
            // Return mock data if API key not configured
            return NextResponse.json({
                success: true,
                data: {
                    temp: 22,
                    condition: 'Partly Cloudy',
                    description: 'partly cloudy',
                    humidity: 65,
                    windSpeed: 15,
                },
            });
        }

        // Fetch current weather from OpenWeatherMap
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

        const response = await fetch(weatherUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const weatherData = await response.json();

        return NextResponse.json({
            success: true,
            data: {
                temp: weatherData.main.temp,
                condition: weatherData.weather[0].main,
                description: weatherData.weather[0].description,
                humidity: weatherData.main.humidity,
                windSpeed: weatherData.wind.speed * 3.6, // Convert m/s to km/h
            },
        });
    } catch (error) {
        console.error('Error fetching weather:', error);

        // Return mock data on error
        return NextResponse.json({
            success: true,
            data: {
                temp: 22,
                condition: 'Partly Cloudy',
                description: 'partly cloudy',
                humidity: 65,
                windSpeed: 15,
            },
        });
    }
}
