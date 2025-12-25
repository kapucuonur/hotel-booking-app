"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Hotel, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSession, signIn, signOut } from "next-auth/react";

const links = [
    { href: "/", label: "Home" },
    { href: "/rooms", label: "Rooms" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { data: session, status } = useSession();

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                        <Hotel className="h-6 w-6 text-primary" />
                        <span>LuxStay</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium transition-colors hover:text-primary"
                            >
                                {link.label}
                            </Link>
                        ))}
                        {session && (
                            <Link
                                href="/my-bookings"
                                className="text-sm font-medium transition-colors hover:text-primary"
                            >
                                My Bookings
                            </Link>
                        )}

                        {status === "loading" ? (
                            <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
                        ) : session ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                                >
                                    {session.user?.image ? (
                                        <img
                                            src={session.user.image}
                                            alt={session.user.name || "User"}
                                            className="h-10 w-10 rounded-full border-2 border-primary"
                                        />
                                    ) : (
                                        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                                            {session.user?.name?.[0] || "U"}
                                        </div>
                                    )}
                                </button>

                                {showUserMenu && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2">
                                        <div className="px-4 py-2 border-b">
                                            <p className="font-medium text-sm">{session.user?.name}</p>
                                            <p className="text-xs text-gray-500">{session.user?.email}</p>
                                        </div>
                                        <button
                                            onClick={() => signOut()}
                                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Button onClick={() => signIn('google')}>Sign In</Button>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Nav */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t">
                        <div className="flex flex-col space-y-4">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm font-medium transition-colors hover:text-primary px-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {session && (
                                <Link
                                    href="/my-bookings"
                                    className="text-sm font-medium transition-colors hover:text-primary px-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    My Bookings
                                </Link>
                            )}
                            <div className="pt-2 px-2 space-y-2">
                                {session ? (
                                    <>
                                        <div className="flex items-center gap-2 py-2">
                                            {session.user?.image ? (
                                                <img
                                                    src={session.user.image}
                                                    alt={session.user.name || "User"}
                                                    className="h-8 w-8 rounded-full"
                                                />
                                            ) : (
                                                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-sm">
                                                    {session.user?.name?.[0] || "U"}
                                                </div>
                                            )}
                                            <span className="text-sm font-medium">{session.user?.name}</span>
                                        </div>
                                        <Button
                                            onClick={() => signOut()}
                                            variant="outline"
                                            className="w-full"
                                        >
                                            Sign Out
                                        </Button>
                                    </>
                                ) : (
                                    <Button onClick={() => signIn('google')} className="w-full">
                                        Sign In
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

