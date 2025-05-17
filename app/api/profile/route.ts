import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const id = token.id;

  if (!id || typeof id !== 'string') {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
  }

  try {
    console.log('Fetching user with id:', id);

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        mobile: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('User fetch error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
