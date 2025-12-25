import Link from 'next/link';
import { LayoutDashboard, Calendar, Hotel, BarChart3 } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const navItems = [
        { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/admin/bookings', label: 'Bookings', icon: Calendar },
        { href: '/admin/rooms', label: 'Rooms', icon: Hotel },
        { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    ];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            {/* Header */}
            <header className="bg-card border-b sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                        <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                            ← Back to Site
                        </Link>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <nav className="bg-card border rounded-lg p-4 space-y-2">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
                                    >
                                        <Icon className="h-5 w-5" />
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-4">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
