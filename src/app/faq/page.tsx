"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
    {
        category: "Booking & Reservations",
        questions: [
            {
                q: "How do I make a reservation?",
                a: "You can make a reservation directly through our website by selecting your desired room, dates, and completing the booking form. You'll receive an instant confirmation email."
            },
            {
                q: "Can I modify or cancel my reservation?",
                a: "Yes! You can modify or cancel your reservation up to 48 hours before check-in without any penalty. Log into your account and go to 'My Bookings' to manage your reservations."
            },
            {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards (Visa, Mastercard, American Express) through our secure Stripe payment gateway. Payment is processed at the time of booking."
            },
            {
                q: "Do I need to pay a deposit?",
                a: "Full payment is required at the time of booking. This secures your reservation and guarantees your room."
            }
        ]
    },
    {
        category: "Check-in & Check-out",
        questions: [
            {
                q: "What are your check-in and check-out times?",
                a: "Check-in is from 3:00 PM and check-out is until 11:00 AM. Early check-in or late check-out may be available upon request, subject to availability."
            },
            {
                q: "What do I need to check in?",
                a: "You'll need a valid government-issued photo ID and the credit card used for booking. If someone else made the reservation for you, please bring their authorization."
            },
            {
                q: "Is there a minimum age requirement?",
                a: "Guests must be at least 18 years old to check in. Minors must be accompanied by an adult."
            }
        ]
    },
    {
        category: "Rooms & Amenities",
        questions: [
            {
                q: "What amenities are included in the rooms?",
                a: "All rooms include free Wi-Fi, flat-screen TV, air conditioning, mini-bar, coffee maker, premium toiletries, and plush bathrobes. Specific amenities vary by room type."
            },
            {
                q: "Are pets allowed?",
                a: "We welcome pets in select rooms with advance notice. A pet fee of $50 per night applies. Please contact us before booking to ensure availability."
            },
            {
                q: "Is breakfast included?",
                a: "Breakfast is included with Deluxe and Suite bookings. Standard rooms can add breakfast for $25 per person per day."
            },
            {
                q: "Do you have accessible rooms?",
                a: "Yes, we have ADA-compliant accessible rooms with roll-in showers and other accessibility features. Please request these when booking."
            }
        ]
    },
    {
        category: "Services & Facilities",
        questions: [
            {
                q: "Do you offer airport transportation?",
                a: "Yes, we provide airport shuttle service for $45 per person each way. Please arrange this at least 24 hours in advance through our concierge."
            },
            {
                q: "Is parking available?",
                a: "Yes, we offer valet parking for $35 per night and self-parking for $25 per night. Both are subject to availability."
            },
            {
                q: "Do you have a fitness center?",
                a: "Yes, our 24/7 fitness center is complimentary for all guests and features modern cardio and strength training equipment."
            },
            {
                q: "Is there a swimming pool?",
                a: "Yes, we have a heated rooftop pool open from 6:00 AM to 10:00 PM daily, with stunning city views."
            }
        ]
    }
];

export default function FAQPage() {
    const [openItems, setOpenItems] = useState<Set<string>>(new Set());

    const toggleItem = (id: string) => {
        const newOpenItems = new Set(openItems);
        if (newOpenItems.has(id)) {
            newOpenItems.delete(id);
        } else {
            newOpenItems.add(id);
        }
        setOpenItems(newOpenItems);
    };

    return (
        <main className="min-h-screen py-12 bg-zinc-50 dark:bg-zinc-950">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">Frequently Asked Questions</h1>
                    <p className="text-xl text-muted-foreground">
                        Find answers to common questions about LuxStay
                    </p>
                </div>

                <div className="space-y-8">
                    {faqs.map((category, categoryIndex) => (
                        <div key={categoryIndex}>
                            <h2 className="text-2xl font-bold mb-4">{category.category}</h2>
                            <div className="space-y-3">
                                {category.questions.map((faq, faqIndex) => {
                                    const id = `${categoryIndex}-${faqIndex}`;
                                    const isOpen = openItems.has(id);

                                    return (
                                        <div
                                            key={id}
                                            className="border rounded-lg bg-card overflow-hidden"
                                        >
                                            <button
                                                onClick={() => toggleItem(id)}
                                                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-accent transition-colors"
                                            >
                                                <span className="font-semibold pr-8">{faq.q}</span>
                                                <ChevronDown
                                                    className={cn(
                                                        "h-5 w-5 flex-shrink-0 transition-transform",
                                                        isOpen && "transform rotate-180"
                                                    )}
                                                />
                                            </button>
                                            <div
                                                className={cn(
                                                    "grid transition-all duration-300",
                                                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                                )}
                                            >
                                                <div className="min-h-0 overflow-hidden">
                                                    <p className="px-6 pb-4 text-muted-foreground">
                                                        {faq.a}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 p-6 rounded-lg border bg-card text-center">
                    <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
                    <p className="text-muted-foreground mb-4">
                        Our team is here to help 24/7
                    </p>
                    <a
                        href="mailto:info@luxstay.com"
                        className="text-primary hover:underline font-medium"
                    >
                        Contact Us
                    </a>
                </div>
            </div>
        </main>
    );
}
