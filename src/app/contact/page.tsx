import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen py-20 bg-zinc-50 dark:bg-zinc-950">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-bold tracking-tight mb-8 text-center">Contact Us</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-card border rounded-xl overflow-hidden shadow-sm">
                    {/* Contact Info */}
                    <div className="bg-primary p-8 text-primary-foreground flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                            <p className="opacity-90 mb-8">
                                Have a question or need assistance? Our team is here to help you 24/7.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <Phone className="h-5 w-5" />
                                    <span>+1 (555) 123-4567</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Mail className="h-5 w-5" />
                                    <span>support@luxstay.com</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <MapPin className="h-5 w-5" />
                                    <span>123 Luxury Ave, Beverly Hills, CA</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <p className="text-sm opacity-70">
                                Follow us on social media for updates.
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="p-8">
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">Name</label>
                                <input type="text" id="name" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Your Name" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">Email</label>
                                <input type="email" id="email" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="your@email.com" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">Message</label>
                                <textarea id="message" rows={4} className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="How can we help?" />
                            </div>
                            <Button className="w-full">Send Message</Button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
