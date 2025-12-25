export default function CancellationPage() {
    return (
        <main className="min-h-screen py-12 bg-zinc-50 dark:bg-zinc-950">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-bold tracking-tight mb-8">Cancellation Policy</h1>
                <p className="text-sm text-muted-foreground mb-8">Last updated: December 25, 2024</p>

                <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Standard Cancellation Policy</h2>
                        <p className="text-muted-foreground mb-4">
                            At LuxStay, we understand that plans can change. Our cancellation policy is designed to be fair and flexible while protecting both our guests and our business.
                        </p>

                        <div className="bg-card border rounded-lg p-6 my-6">
                            <h3 className="text-xl font-semibold mb-4">Cancellation Timeline</h3>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-32 font-semibold text-primary">48+ hours</div>
                                    <div className="text-muted-foreground">
                                        <strong>Full Refund</strong> - Cancel 48 hours or more before check-in for a complete refund
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-32 font-semibold text-orange-500">24-48 hours</div>
                                    <div className="text-muted-foreground">
                                        <strong>50% Refund</strong> - Cancellations within 24-48 hours receive 50% refund
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-32 font-semibold text-red-500">Under 24 hours</div>
                                    <div className="text-muted-foreground">
                                        <strong>No Refund</strong> - Cancellations within 24 hours are non-refundable
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-32 font-semibold text-red-500">No-Show</div>
                                    <div className="text-muted-foreground">
                                        <strong>No Refund</strong> - Failure to check in results in full charge
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">How to Cancel</h2>
                        <p className="text-muted-foreground mb-3">
                            You can cancel your reservation through:
                        </p>
                        <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                            <li><strong>Online:</strong> Log into your account and go to "My Bookings"</li>
                            <li><strong>Email:</strong> Send a cancellation request to reservations@luxstay.com</li>
                            <li><strong>Phone:</strong> Call us at +1 (234) 567-890</li>
                        </ol>
                        <p className="text-muted-foreground mt-4">
                            You will receive a confirmation email once your cancellation is processed.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Refund Processing</h2>
                        <p className="text-muted-foreground">
                            Refunds are processed back to the original payment method within 5-10 business days. The exact timing depends on your bank or credit card company.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Modifications</h2>
                        <p className="text-muted-foreground mb-3">
                            If you need to modify your reservation instead of canceling:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>Date changes are subject to availability and may incur price differences</li>
                            <li>Room upgrades can be requested at any time</li>
                            <li>Guest name changes must be made at least 24 hours before check-in</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Special Circumstances</h2>
                        <p className="text-muted-foreground mb-3">
                            We may waive cancellation fees in the following situations:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>Medical emergencies (documentation required)</li>
                            <li>Natural disasters or severe weather</li>
                            <li>Government-mandated travel restrictions</li>
                            <li>Death in the family (documentation required)</li>
                        </ul>
                        <p className="text-muted-foreground mt-4">
                            Please contact us directly to discuss your situation. We review each case individually.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Group Bookings</h2>
                        <p className="text-muted-foreground">
                            Bookings of 5 or more rooms are considered group bookings and may have different cancellation terms. Please contact our group sales team for specific policies.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Non-Refundable Rates</h2>
                        <p className="text-muted-foreground">
                            Some promotional rates are non-refundable and cannot be canceled or modified. These rates are clearly marked during the booking process. Please review carefully before confirming.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Hotel-Initiated Cancellations</h2>
                        <p className="text-muted-foreground">
                            In rare cases where we must cancel your reservation (e.g., property damage, overbooking), we will:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-3">
                            <li>Provide full refund immediately</li>
                            <li>Assist in finding alternative accommodations</li>
                            <li>Offer compensation for any inconvenience</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Questions?</h2>
                        <p className="text-muted-foreground">
                            If you have questions about our cancellation policy, please contact us:
                        </p>
                        <p className="text-muted-foreground mt-2">
                            Email: reservations@luxstay.com<br />
                            Phone: +1 (234) 567-890 (24/7)<br />
                            Live Chat: Available on our website
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
