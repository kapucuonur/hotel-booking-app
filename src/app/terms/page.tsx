export default function TermsPage() {
    return (
        <main className="min-h-screen py-12 bg-zinc-50 dark:bg-zinc-950">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-bold tracking-tight mb-8">Terms of Service</h1>
                <p className="text-sm text-muted-foreground mb-8">Last updated: December 25, 2024</p>

                <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                        <p className="text-muted-foreground">
                            By accessing and using LuxStay's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">2. Reservations and Bookings</h2>
                        <p className="text-muted-foreground mb-3">
                            All reservations are subject to availability and confirmation. By making a reservation, you agree to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>Provide accurate and complete information</li>
                            <li>Pay the full amount at the time of booking</li>
                            <li>Comply with our cancellation policy</li>
                            <li>Abide by hotel rules and regulations during your stay</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">3. Payment Terms</h2>
                        <p className="text-muted-foreground mb-3">
                            Payment is processed securely through Stripe. We accept major credit cards. By providing payment information, you represent that:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>You are authorized to use the payment method</li>
                            <li>The information provided is accurate</li>
                            <li>You will pay all charges incurred</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">4. Cancellation Policy</h2>
                        <p className="text-muted-foreground">
                            Cancellations made 48 hours or more before check-in will receive a full refund. Cancellations made within 48 hours of check-in are non-refundable. No-shows will be charged the full amount.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">5. Guest Conduct</h2>
                        <p className="text-muted-foreground mb-3">
                            Guests are expected to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>Respect other guests and hotel staff</li>
                            <li>Not engage in illegal activities on the premises</li>
                            <li>Not cause damage to hotel property</li>
                            <li>Comply with maximum occupancy limits</li>
                            <li>Follow all safety and security procedures</li>
                        </ul>
                        <p className="text-muted-foreground mt-3">
                            We reserve the right to terminate a guest's stay without refund for violation of these terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">6. Liability</h2>
                        <p className="text-muted-foreground">
                            LuxStay is not liable for loss, theft, or damage to personal property. We recommend using in-room safes for valuables. The hotel's liability is limited to direct damages and does not exceed the cost of your reservation.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">7. Privacy</h2>
                        <p className="text-muted-foreground">
                            Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">8. Modifications to Terms</h2>
                        <p className="text-muted-foreground">
                            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Continued use of our services constitutes acceptance of modified terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">9. Contact Information</h2>
                        <p className="text-muted-foreground">
                            For questions about these Terms of Service, please contact us at:
                        </p>
                        <p className="text-muted-foreground mt-2">
                            Email: legal@luxstay.com<br />
                            Phone: +1 (234) 567-890<br />
                            Address: 123 Luxury Avenue, City Center, 12345
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
