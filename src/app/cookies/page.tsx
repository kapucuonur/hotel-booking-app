export default function CookiesPage() {
    return (
        <main className="min-h-screen py-12 bg-zinc-50 dark:bg-zinc-950">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-bold tracking-tight mb-8">Cookie Policy</h1>
                <p className="text-sm text-muted-foreground mb-8">Last updated: December 25, 2024</p>

                <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
                        <p className="text-muted-foreground">
                            Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Types of Cookies We Use</h2>

                        <div className="space-y-6">
                            <div className="border-l-4 border-primary pl-4">
                                <h3 className="text-xl font-semibold mb-2">Essential Cookies</h3>
                                <p className="text-muted-foreground">
                                    These cookies are necessary for the website to function properly. They enable core functionality such as security, authentication, and accessibility.
                                </p>
                            </div>

                            <div className="border-l-4 border-blue-500 pl-4">
                                <h3 className="text-xl font-semibold mb-2">Performance Cookies</h3>
                                <p className="text-muted-foreground">
                                    These cookies help us understand how visitors interact with our website by collecting anonymous information about pages visited and errors encountered.
                                </p>
                            </div>

                            <div className="border-l-4 border-green-500 pl-4">
                                <h3 className="text-xl font-semibold mb-2">Functional Cookies</h3>
                                <p className="text-muted-foreground">
                                    These cookies remember your preferences and choices to provide enhanced, personalized features.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Managing Cookies</h2>
                        <p className="text-muted-foreground mb-3">
                            You can control and manage cookies in several ways:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>Browser settings - Most browsers allow you to refuse or delete cookies</li>
                            <li>Third-party tools - Various privacy tools can help manage cookies</li>
                            <li>Opt-out links - Some cookies provide direct opt-out mechanisms</li>
                        </ul>
                        <p className="text-muted-foreground mt-4">
                            Note: Blocking essential cookies may affect website functionality.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                        <p className="text-muted-foreground">
                            For questions about our use of cookies, contact us at privacy@luxstay.com
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
