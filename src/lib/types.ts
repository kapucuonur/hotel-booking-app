export interface Room {
    id: string;
    name: string;
    description: string;
    price: number;
    capacity: number;
    image: string;
    amenities: string[];
    type: 'standard' | 'deluxe' | 'suite';
}

export interface Booking {
    id: string;
    roomId: string;
    startDate: Date;
    endDate: Date;
    guestName: string;
    guestEmail: string;
    totalPrice: number;
    status: 'confirmed' | 'pending' | 'cancelled';
}

// Database model types
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
export type PaymentStatus = 'PENDING' | 'PROCESSING' | 'SUCCEEDED' | 'FAILED' | 'REFUNDED';

export interface Hotel {
    id: string;
    name: string;
    description: string;
    address: string;
    city: string;
    country: string;
    rating: number;
    image: string;
}

export interface RoomDB {
    id: string;
    hotelId: string;
    name: string;
    description: string;
    type: string;
    price: number;
    capacity: number;
    size: number;
    image: string;
    amenities: string[];
}

export interface BookingDB {
    id: string;
    userId: string;
    roomId: string;
    checkIn: Date;
    checkOut: Date;
    guests: number;
    totalPrice: number;
    status: BookingStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface PaymentDB {
    id: string;
    bookingId: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    stripePaymentId: string | null;
    stripeClientSecret: string | null;
}

// API Response types
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface RoomWithHotel extends RoomDB {
    hotel: Hotel;
}

export interface BookingWithDetails extends BookingDB {
    room: RoomDB;
    payment?: PaymentDB;
}

// Form types
export interface BookingFormData {
    roomId: string;
    checkIn: string;
    checkOut: string;
    guests: number;
}

export interface AvailabilityCheckData {
    roomId: string;
    checkIn: string;
    checkOut: string;
}

// Frontend display type (uses actual DB fields)
export interface RoomDisplay {
    id: string;
    name: string;
    description: string;
    type: string;
    price: number;
    capacity: number;
    image: string;
    amenities: string[];
    hotel?: {
        name: string;
        city: string;
        rating: number;
    };
}
