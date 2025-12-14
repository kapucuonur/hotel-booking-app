import { Hotel } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full border-t bg-background py-12">
            <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 font-bold text-xl">
                        <Hotel className="h-6 w-6 text-primary" />
                        <span>LuxStay</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Experience luxury and comfort in the heart of the city.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>Rooms</li>
                        <li>Amenities</li>
                        <li>About Us</li>
                        <li>Contact</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-4">Support</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>FAQ</li>
                        <li>Terms of Service</li>
                        <li>Privacy Policy</li>
                        <li>Cancellation Policy</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-4">Newsletter</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Subscribe to get special offers.
                    </p>
                    {/* Placeholder for newsletter input */}
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 md:px-8 mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} LuxStay. All rights reserved.
            </div>
        </footer>
    );
}
