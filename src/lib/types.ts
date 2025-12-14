export interface Room {
    id: string;
    title: string;
    description: string;
    price: number;
    capacity: number;
    imageUrl: string;
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
