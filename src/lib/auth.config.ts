import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '@/lib/db';

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error('Google OAuth credentials are not defined in environment variables');
}

if (!process.env.NEXTAUTH_SECRET) {
    throw new Error('NEXTAUTH_SECRET is not defined in environment variables');
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            if (!user.email) return false;

            try {
                // Create or update user in database
                await prisma.user.upsert({
                    where: { email: user.email },
                    update: {
                        name: user.name,
                        image: user.image,
                    },
                    create: {
                        email: user.email,
                        name: user.name,
                        image: user.image,
                    },
                });
                return true;
            } catch (error) {
                console.error('Error syncing user to database:', error);
                return false;
            }
        },
        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                session.user.image = token.picture as string;
                session.user.role = token.role as string;
            }
            return session;
        },
        async jwt({ token, user, account }) {
            if (user) {
                token.sub = user.id;
                token.email = user.email;
                token.name = user.name;
                token.picture = user.image;

                // Fetch user role from database (with fallback)
                try {
                    if (user.email) {
                        const dbUser = await prisma.user.findUnique({
                            where: { email: user.email },
                            select: { role: true },
                        });
                        token.role = dbUser?.role || 'user';
                    }
                } catch (error) {
                    // Fallback to 'user' if role field doesn't exist yet
                    console.log('Role field not available yet, defaulting to user');
                    token.role = 'user';
                }
            }
            return token;
        },
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: true,
    useSecureCookies: process.env.NODE_ENV === 'production',
    trustHost: true,
};
