'use client';

import { MapPin, Plane, Car, Bus, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TransportationInfoProps {
    hotelName: string;
    address: string;
    city: string;
    latitude?: number;
    longitude?: number;
    nearestAirport?: string;
    airportDistance?: number;
    transportationInfo?: {
        taxiFare?: string;
        publicTransport?: string[];
        uberEstimate?: string;
    };
}

export function TransportationInfo({
    hotelName,
    address,
    city,
    latitude,
    longitude,
    nearestAirport,
    airportDistance,
    transportationInfo,
}: TransportationInfoProps) {
    const googleMapsUrl = latitude && longitude
        ? `https://www.google.com/maps?q=${latitude},${longitude}`
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotelName + ' ' + address + ' ' + city)}`;

    const directionsUrl = latitude && longitude
        ? `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
        : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address + ' ' + city)}`;

    return (
        <div className="space-y-6">
            {/* Map Embed */}
            <div className="bg-card border rounded-lg overflow-hidden">
                <div className="aspect-video relative">
                    {latitude && longitude ? (
                        <iframe
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${latitude},${longitude}&zoom=15`}
                        />
                    ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                            <div className="text-center text-muted-foreground">
                                <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                <p>Map unavailable</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="p-4 flex gap-2">
                    <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button variant="outline" className="w-full" size="sm">
                            <MapPin className="h-4 w-4 mr-2" />
                            View on Maps
                        </Button>
                    </a>
                    <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button variant="default" className="w-full" size="sm">
                            <Navigation className="h-4 w-4 mr-2" />
                            Get Directions
                        </Button>
                    </a>
                </div>
            </div>

            {/* Transportation Options */}
            <div className="bg-card border rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold">Getting Here</h3>

                {/* Airport Info */}
                {nearestAirport && (
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <Plane className="h-5 w-5 text-primary mt-0.5" />
                        <div className="flex-1">
                            <div className="font-medium">{nearestAirport}</div>
                            <div className="text-sm text-muted-foreground">
                                {airportDistance ? `${airportDistance} km away` : 'Nearest airport'}
                            </div>
                        </div>
                    </div>
                )}

                {/* Taxi */}
                {transportationInfo?.taxiFare && (
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <Car className="h-5 w-5 text-primary mt-0.5" />
                        <div className="flex-1">
                            <div className="font-medium">Taxi from Airport</div>
                            <div className="text-sm text-muted-foreground">
                                Estimated fare: {transportationInfo.taxiFare}
                            </div>
                        </div>
                    </div>
                )}

                {/* Public Transport */}
                {transportationInfo?.publicTransport && transportationInfo.publicTransport.length > 0 && (
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <Bus className="h-5 w-5 text-primary mt-0.5" />
                        <div className="flex-1">
                            <div className="font-medium">Public Transport</div>
                            <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                                {transportationInfo.publicTransport.map((option, index) => (
                                    <li key={index}>• {option}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* Uber Estimate */}
                {transportationInfo?.uberEstimate && (
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <Car className="h-5 w-5 text-primary mt-0.5" />
                        <div className="flex-1">
                            <div className="font-medium">Ride-sharing (Uber/Lyft)</div>
                            <div className="text-sm text-muted-foreground">
                                Estimated: {transportationInfo.uberEstimate}
                            </div>
                        </div>
                    </div>
                )}

                {/* Default message if no transportation info */}
                {!nearestAirport && !transportationInfo?.taxiFare && !transportationInfo?.publicTransport && (
                    <div className="text-center text-muted-foreground py-4">
                        <p className="text-sm">Transportation information will be available soon.</p>
                        <p className="text-xs mt-1">Use the map above to plan your route.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
