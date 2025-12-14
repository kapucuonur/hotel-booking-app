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
    {
        id: "5",
        title: "Penthouse Skyline View",
        description: "Top-floor luxury penthouse offering panoramic city views, private terrace, and exclusive VIP concierge service.",
        price: 850,
        capacity: 2,
        imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2574&auto=format&fit=crop",
        amenities: ["Panoramic View", "Private Terrace", "VIP Service", "Jacuzzi", "King Bed"],
        type: 'suite'
    },
    {
        id: "6",
        title: "Budget Solo Room",
        description: "Compact and cozy room designed for the solo traveler who needs a comfortable base to explore the city.",
        price: 99,
        capacity: 1,
        imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2670&auto=format&fit=crop",
        amenities: ["Single Bed", "Free Wi-Fi", "Work Desk", "Compact Bath"],
        type: 'standard'
    },
    {
        id: "7",
        title: "Double Deluxe Twin",
        description: "Spacious room with two queen beds, ideal for friends or colleagues traveling together.",
        price: 220,
        capacity: 4,
        imageUrl: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2670&auto=format&fit=crop",
        amenities: ["2 Queen Beds", "City View", "Smart TV", "Mini Fridge"],
        type: 'deluxe'
    },
    {
        id: "8",
        title: "Oceanfront Villa",
        description: "An exclusive detached villa steps away from the beach, featuring a private pool and outdoor dining area.",
        price: 1200,
        capacity: 6,
        imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2525&auto=format&fit=crop",
        amenities: ["Private Pool", "Beach Access", "full Kitchen", "3 Bedrooms", "BBQ Grill"],
        type: 'suite'
    },
];
