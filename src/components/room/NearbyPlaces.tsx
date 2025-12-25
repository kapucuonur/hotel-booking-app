'use client';

import { useEffect, useState } from 'react';
import { MapPin, Utensils, ShoppingBag, Heart, Building2, Loader2 } from 'lucide-react';

interface Place {
    name: string;
    type: string;
    distance: string;
    rating?: number;
}

interface NearbyPlacesProps {
    latitude?: number;
    longitude?: number;
    city: string;
}

export function NearbyPlaces({ latitude, longitude, city }: NearbyPlacesProps) {
    const [places, setPlaces] = useState<{ [key: string]: Place[] }>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPlaces() {
            if (!latitude || !longitude) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`/api/places?lat=${latitude}&lng=${longitude}`);
                if (!response.ok) throw new Error('Failed to fetch places');
                const data = await response.json();
                setPlaces(data.data || {});
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load nearby places');
            } finally {
                setLoading(false);
            }
        }

        fetchPlaces();
    }, [latitude, longitude]);

    const categories = [
        { key: 'restaurants', label: 'Restaurants & Cafes', icon: Utensils, color: 'text-orange-600' },
        { key: 'attractions', label: 'Tourist Attractions', icon: MapPin, color: 'text-blue-600' },
        { key: 'shopping', label: 'Shopping', icon: ShoppingBag, color: 'text-purple-600' },
        { key: 'healthcare', label: 'Healthcare', icon: Heart, color: 'text-red-600' },
        { key: 'entertainment', label: 'Entertainment', icon: Building2, color: 'text-green-600' },
    ];

    if (!latitude || !longitude) {
        return (
            <div className="bg-card border rounded-lg p-6 text-center text-muted-foreground">
                <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Location data unavailable</p>
                <p className="text-xs mt-1">Nearby places will be shown when location is available</p>
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

    if (error) {
        return (
            <div className="bg-card border rounded-lg p-6 text-center text-muted-foreground">
                <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">{error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div>
                <h3 className="text-lg font-semibold mb-1">Nearby Places</h3>
                <p className="text-sm text-muted-foreground">Explore what's around the hotel</p>
            </div>

            <div className="grid gap-4">
                {categories.map((category) => {
                    const Icon = category.icon;
                    const categoryPlaces = places[category.key] || [];

                    return (
                        <div key={category.key} className="bg-card border rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <Icon className={`h-5 w-5 ${category.color}`} />
                                <h4 className="font-medium">{category.label}</h4>
                            </div>

                            {categoryPlaces.length > 0 ? (
                                <div className="space-y-2">
                                    {categoryPlaces.slice(0, 5).map((place, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start justify-between text-sm p-2 bg-muted/50 rounded"
                                        >
                                            <div className="flex-1">
                                                <div className="font-medium">{place.name}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {place.distance}
                                                </div>
                                            </div>
                                            {place.rating && (
                                                <div className="flex items-center gap-1 text-xs">
                                                    <span>⭐</span>
                                                    <span>{place.rating.toFixed(1)}</span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    No {category.label.toLowerCase()} found nearby
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
