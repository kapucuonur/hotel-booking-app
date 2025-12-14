import { Room } from "./types";

export const rooms: Room[] = [
    {
        id: "1",
        title: "Deluxe Ocean View",
        description: "Wake up to the sound of the ocean in this spacious deluxe room featuring a private balcony and premium amenities.",
        price: 299,
        capacity: 2,
        imageUrl: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2698&auto=format&fit=crop",
        amenities: ["Ocean View", "King Bed", "Free Wi-Fi", "Balcony", "Mini Bar"],
        type: 'deluxe'
    },
    {
        id: "2",
        title: "Executive Suite",
        description: "Experience ultimate luxury in our executive suite with separate living area, workspace, and city views.",
        price: 450,
        capacity: 3,
        imageUrl: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2670&auto=format&fit=crop",
        amenities: ["City View", "Living Room", "Workspace", "Jacuzzi", "Butler Service"],
        type: 'suite'
    },
    {
        id: "3",
        title: "Standard Cozy Room",
        description: "Perfect for solo travelers or couples, our standard room offers comfort and style at an affordable rate.",
        price: 150,
        capacity: 2,
        imageUrl: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2674&auto=format&fit=crop",
        amenities: ["Queen Bed", "Smart TV", "Coffee Maker", "Rain Shower"],
        type: 'standard'
    },
    {
        id: "4",
        title: "Family Garden Suite",
        description: "Spacious suite with direct access to the hotel gardens, perfect for families with children.",
        price: 380,
        capacity: 4,
        imageUrl: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2670&auto=format&fit=crop",
        amenities: ["Garden Access", "2 Bedrooms", "Kitchenette", "Play Area"],
        type: 'suite'
    },
];
