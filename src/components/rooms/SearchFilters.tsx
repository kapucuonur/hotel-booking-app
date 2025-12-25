'use client';

import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface SearchFiltersProps {
    onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
    minPrice: number;
    maxPrice: number;
    amenities: string[];
    capacity: number;
    type: string;
    sortBy: string;
}

const AMENITIES_OPTIONS = [
    'Free Wi-Fi',
    'Ocean View',
    'City View',
    'Balcony',
    'King Bed',
    'Mini Bar',
    'Jacuzzi',
    'Living Room',
    'Workspace',
    'Butler Service',
];

const ROOM_TYPES = [
    { value: '', label: 'All Types' },
    { value: 'standard', label: 'Standard' },
    { value: 'deluxe', label: 'Deluxe' },
    { value: 'suite', label: 'Suite' },
    { value: 'penthouse', label: 'Penthouse' },
];

export function SearchFilters({ onFilterChange }: SearchFiltersProps) {
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    const [capacity, setCapacity] = useState(1);
    const [roomType, setRoomType] = useState('');
    const [sortBy, setSortBy] = useState('price-asc');

    useEffect(() => {
        onFilterChange({
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
            amenities: selectedAmenities,
            capacity,
            type: roomType,
            sortBy,
        });
    }, [priceRange, selectedAmenities, capacity, roomType, sortBy]);

    const toggleAmenity = (amenity: string) => {
        setSelectedAmenities(prev =>
            prev.includes(amenity)
                ? prev.filter(a => a !== amenity)
                : [...prev, amenity]
        );
    };

    const clearFilters = () => {
        setPriceRange([0, 1000]);
        setSelectedAmenities([]);
        setCapacity(1);
        setRoomType('');
        setSortBy('price-asc');
    };

    const hasActiveFilters =
        priceRange[0] > 0 ||
        priceRange[1] < 1000 ||
        selectedAmenities.length > 0 ||
        capacity > 1 ||
        roomType !== '';

    return (
        <div className="bg-card border rounded-lg p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Filters</h3>
                {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                        <X className="h-4 w-4 mr-1" />
                        Clear All
                    </Button>
                )}
            </div>

            {/* Price Range */}
            <div className="space-y-3">
                <label className="text-sm font-medium">Price Range</label>
                <Slider
                    min={0}
                    max={1000}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="w-full"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                </div>
            </div>

            {/* Room Type */}
            <div className="space-y-3">
                <label className="text-sm font-medium">Room Type</label>
                <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                >
                    {ROOM_TYPES.map(type => (
                        <option key={type.value} value={type.value}>
                            {type.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Capacity */}
            <div className="space-y-3">
                <label className="text-sm font-medium">Guests</label>
                <select
                    value={capacity}
                    onChange={(e) => setCapacity(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg"
                >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                    ))}
                </select>
            </div>

            {/* Amenities */}
            <div className="space-y-3">
                <label className="text-sm font-medium">Amenities</label>
                <div className="grid grid-cols-2 gap-2">
                    {AMENITIES_OPTIONS.map(amenity => (
                        <label
                            key={amenity}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                checked={selectedAmenities.includes(amenity)}
                                onChange={() => toggleAmenity(amenity)}
                                className="rounded border-gray-300"
                            />
                            <span className="text-sm">{amenity}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Sort By */}
            <div className="space-y-3 pt-4 border-t">
                <label className="text-sm font-medium">Sort By</label>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                >
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="capacity">Capacity</option>
                </select>
            </div>
        </div>
    );
}
