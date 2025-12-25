import Link from "next/link";
import { Hotel, Mail, MapPin, Phone, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
    return (
        <footer className="w-full border-t bg-background">
            <div className="container mx-auto px-4 md:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 font-bold text-xl">
                            <Hotel className="h-6 w-6 text-primary" />
                            <span>LuxStay</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Experience luxury and comfort in the heart of the city. Your perfect stay awaits.
                        </p>
                        <div className="flex gap-3">
                            <Link
                                href="https://github.com/kapucuonur"
                                target="_blank"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Github className="h-5 w-5" />
                            </Link>
                            <Link
                                href="https://linkedin.com/in/onurkapucu"
                                target="_blank"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Linkedin className="h-5 w-5" />
                            </Link>
                            <Link
                                href="https://twitter.com"
                                target="_blank"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Twitter className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/rooms" className="text-muted-foreground hover:text-primary transition-colors">
                                    Browse Rooms
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/my-bookings" className="text-muted-foreground hover:text-primary transition-colors">
                                    My Bookings
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-semibold mb-4">Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/cancellation" className="text-muted-foreground hover:text-primary transition-colors">
                                    Cancellation Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <span>123 Luxury Avenue, City Center, 12345</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 flex-shrink-0" />
                                <a href="tel:+1234567890" className="hover:text-primary transition-colors">
                                    +1 (234) 567-890
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 flex-shrink-0" />
                                <a href="mailto:info@luxstay.com" className="hover:text-primary transition-colors">
                                    info@luxstay.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t">
                <div className="container mx-auto px-4 md:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                        <p>© {new Date().getFullYear()} LuxStay. All rights reserved.</p>
                        <div className="flex gap-6">
                            <Link href="/terms" className="hover:text-primary transition-colors">
                                Terms
                            </Link>
                            <Link href="/privacy" className="hover:text-primary transition-colors">
                                Privacy
                            </Link>
                            <Link href="/cookies" className="hover:text-primary transition-colors">
                                Cookies
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
