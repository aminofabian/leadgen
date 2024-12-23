import db from '@/lib/db';
import { auth } from '@/auth';
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await auth();
  
  if (!session || session.user.role !== 'ADMIN') {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const users = await db.user.findMany({
      include: {
        subscription: true
      }
    })
    return NextResponse.json(users)
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 