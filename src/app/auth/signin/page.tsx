'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Chrome } from 'lucide-react';

export default function SignInPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to LuxStay</h1>
                    <p className="text-gray-600">Sign in to continue with your booking</p>
                </div>

                <div className="space-y-4">
                    <Button
                        onClick={() => signIn('google', { callbackUrl: '/booking' })}
                        className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 py-6 text-base font-medium"
                    >
                        <Chrome className="w-5 h-5" />
                        Continue with Google
                    </Button>
                </div>

                <p className="text-xs text-gray-500 text-center mt-6">
                    By signing in, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>
        </div>
    );
}
