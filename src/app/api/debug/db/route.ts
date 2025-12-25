import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        // Test database connection
        await prisma.$connect();

        // Try to query users table
        const userCount = await prisma.user.count();

        return NextResponse.json({
            success: true,
            message: 'Database connection successful',
            userCount,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Database connection error:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
