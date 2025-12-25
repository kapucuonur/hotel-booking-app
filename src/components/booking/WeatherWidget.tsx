'use client';

import { useEffect, useState } from 'react';
import { Cloud, CloudRain, CloudSnow, Sun, Wind, Loader2 } from 'lucide-react';

interface WeatherData {
    temp: number;
    condition: string;
    description: string;
    humidity: number;
    windSpeed: number;
}

interface WeatherWidgetProps {
    city: string;
    checkInDate?: string;
}

export function WeatherWidget({ city, checkInDate }: WeatherWidgetProps) {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchWeather() {
            if (!checkInDate) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}&date=${checkInDate}`);
                if (!response.ok) throw new Error('Failed to fetch weather');
                const data = await response.json();
                setWeather(data.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load weather');
            } finally {
                setLoading(false);
            }
        }

        fetchWeather();
    }, [city, checkInDate]);

    const getWeatherIcon = (condition: string) => {
        const cond = condition.toLowerCase();
        if (cond.includes('rain')) return CloudRain;
        if (cond.includes('snow')) return CloudSnow;
        if (cond.includes('cloud')) return Cloud;
        if (cond.includes('wind')) return Wind;
        return Sun;
    };

    const getPackingSuggestions = (temp: number, condition: string) => {
        const suggestions = [];

        if (temp < 10) {
            suggestions.push('Warm jacket', 'Sweaters', 'Long pants');
        } else if (temp < 20) {
            suggestions.push('Light jacket', 'Long sleeves', 'Jeans');
        } else {
            suggestions.push('Light clothing', 'Shorts', 'T-shirts');
        }

        if (condition.toLowerCase().includes('rain')) {
            suggestions.push('Umbrella', 'Rain jacket');
        }

        if (condition.toLowerCase().includes('sun') || temp > 25) {
            suggestions.push('Sunscreen', 'Sunglasses', 'Hat');
        }

        return suggestions;
    };

    if (!checkInDate) {
        return (
            <div className="bg-card border rounded-lg p-6 text-center text-muted-foreground">
                <Cloud className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Select check-in date to see weather forecast</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="bg-card border rounded-lg p-6 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (error || !weather) {
        return (
            <div className="bg-card border rounded-lg p-6 text-center text-muted-foreground">
                <Cloud className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">{error || 'Weather data unavailable'}</p>
            </div>
        );
    }

    const WeatherIcon = getWeatherIcon(weather.condition);
    const suggestions = getPackingSuggestions(weather.temp, weather.condition);

    return (
        <div className="bg-card border rounded-lg p-6 space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-1">Weather Forecast</h3>
                <p className="text-sm text-muted-foreground">
                    {new Date(checkInDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric'
                    })}
                </p>
            </div>

            {/* Weather Display */}
            <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                    <WeatherIcon className="h-16 w-16 text-primary" />
                </div>
                <div className="flex-1">
                    <div className="text-4xl font-bold">{Math.round(weather.temp)}°C</div>
                    <div className="text-lg capitalize">{weather.description}</div>
                    <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                        <span>💧 {weather.humidity}%</span>
                        <span>💨 {weather.windSpeed} km/h</span>
                    </div>
                </div>
            </div>

            {/* Packing Suggestions */}
            <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Packing Suggestions</h4>
                <div className="grid grid-cols-2 gap-2">
                    {suggestions.map((item, index) => (
                        <div
                            key={index}
                            className="text-sm bg-muted/50 rounded px-3 py-2 flex items-center gap-2"
                        >
                            <span className="text-primary">✓</span>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
