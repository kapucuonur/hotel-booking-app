import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function BookingSuccessPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
            <div className="max-w-md w-full text-center space-y-6 p-8 bg-card border rounded-xl shadow-lg">
                <div className="flex justify-center">
                    <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>
                </div>

                <div>
                    <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
                    <p className="text-muted-foreground">
                        Thank you for choosing LuxStay. We have sent a confirmation email with your booking details.
                    </p>
                </div>

                <div className="pt-6 border-t">
                    <Link href="/">
                        <Button className="w-full" size="lg">Return to Home</Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
