'use client';

import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PriceComparisonProps {
    hotelName: string;
    city: string;
    checkIn?: string;
    checkOut?: string;
    currentPrice: number;
}

export function PriceComparison({ hotelName, city, checkIn, checkOut, currentPrice }: PriceComparisonProps) {
    const platforms = [
        {
            name: 'Booking.com',
            url: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(hotelName + ' ' + city)}`,
            color: 'bg-blue-600 hover:bg-blue-700',
        },
        {
            name: 'Expedia',
            url: `https://www.expedia.com/Hotel-Search?destination=${encodeURIComponent(hotelName + ' ' + city)}`,
            color: 'bg-yellow-600 hover:bg-yellow-700',
        },
        {
            name: 'Hotels.com',
            url: `https://www.hotels.com/search.do?q-destination=${encodeURIComponent(hotelName + ' ' + city)}`,
            color: 'bg-red-600 hover:bg-red-700',
        },
        {
            name: 'Agoda',
            url: `https://www.agoda.com/search?city=${encodeURIComponent(city)}`,
            color: 'bg-purple-600 hover:bg-purple-700',
        },
    ];

    return (
        <div className="bg-card border rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold">Price Comparison</h3>
                    <p className="text-sm text-muted-foreground">
                        Compare prices across major booking platforms
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-sm text-muted-foreground">Our Price</div>
                    <div className="text-2xl font-bold text-primary">${currentPrice}</div>
                </div>
            </div>

            {/* Best Price Guarantee Badge */}
            <div className="bg-green-50 dark:bg-green-950/20 border-2 border-green-200 dark:border-green-900 rounded-lg p-4">
                <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                        <div className="font-semibold text-green-700 dark:text-green-400">Best Price Guarantee</div>
                        <div className="text-xs text-green-600 dark:text-green-500">
                            We match or beat competitor prices
                        </div>
                    </div>
                </div>
            </div>

            {/* Platform Links */}
            <div className="grid grid-cols-2 gap-3">
                {platforms.map((platform) => (
                    <a
                        key={platform.name}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                    >
                        <Button
                            variant="outline"
                            className="w-full justify-between group"
                            size="sm"
                        >
                            <span>{platform.name}</span>
                            <ExternalLink className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </Button>
                    </a>
                ))}
            </div>

            <p className="text-xs text-muted-foreground text-center pt-2 border-t">
                Prices on external sites may vary. Click to compare and find the best deal.
            </p>
        </div>
    );
}
