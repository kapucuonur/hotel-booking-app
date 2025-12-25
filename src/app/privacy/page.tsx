export default function PrivacyPage() {
    return (
        <main className="min-h-screen py-12 bg-zinc-50 dark:bg-zinc-950">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>
                <p className="text-sm text-muted-foreground mb-8">Last updated: December 25, 2024</p>

                <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
                        <p className="text-muted-foreground mb-3">
                            We collect information that you provide directly to us, including:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li><strong>Personal Information:</strong> Name, email address, phone number, billing address</li>
                            <li><strong>Payment Information:</strong> Credit card details (processed securely through Stripe)</li>
                            <li><strong>Booking Information:</strong> Check-in/out dates, room preferences, special requests</li>
                            <li><strong>Account Information:</strong> Username, password, profile picture (if using Google OAuth)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
                        <p className="text-muted-foreground mb-3">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>Process and manage your reservations</li>
                            <li>Communicate with you about your bookings</li>
                            <li>Provide customer support</li>
                            <li>Send you promotional offers (with your consent)</li>
                            <li>Improve our services and user experience</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
                        <p className="text-muted-foreground mb-3">
                            We do not sell your personal information. We may share your information with:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li><strong>Service Providers:</strong> Stripe for payment processing, Supabase for data storage</li>
                            <li><strong>Authentication Providers:</strong> Google for OAuth authentication</li>
                            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
                        <p className="text-muted-foreground">
                            We implement industry-standard security measures to protect your personal information:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-3">
                            <li>SSL/TLS encryption for data transmission</li>
                            <li>Secure database storage with Supabase</li>
                            <li>PCI-compliant payment processing through Stripe</li>
                            <li>Regular security audits and updates</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">5. Cookies and Tracking</h2>
                        <p className="text-muted-foreground">
                            We use cookies and similar technologies to enhance your experience. These include:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-3">
                            <li><strong>Essential Cookies:</strong> Required for site functionality and authentication</li>
                            <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                            <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                        </ul>
                        <p className="text-muted-foreground mt-3">
                            You can control cookies through your browser settings.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
                        <p className="text-muted-foreground mb-3">
                            You have the right to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>Access your personal information</li>
                            <li>Correct inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Opt-out of marketing communications</li>
                            <li>Export your data</li>
                        </ul>
                        <p className="text-muted-foreground mt-3">
                            To exercise these rights, contact us at privacy@luxstay.com
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">7. Data Retention</h2>
                        <p className="text-muted-foreground">
                            We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Booking records are kept for 7 years for accounting purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">8. Children's Privacy</h2>
                        <p className="text-muted-foreground">
                            Our services are not directed to children under 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">9. Changes to This Policy</h2>
                        <p className="text-muted-foreground">
                            We may update this Privacy Policy from time to time. We will notify you of significant changes by email or through a notice on our website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
                        <p className="text-muted-foreground">
                            If you have questions about this Privacy Policy, please contact us:
                        </p>
                        <p className="text-muted-foreground mt-2">
                            Email: privacy@luxstay.com<br />
                            Phone: +1 (234) 567-890<br />
                            Address: 123 Luxury Avenue, City Center, 12345
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
