import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import db  from '@/lib/db';

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const user = await db.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        integrations: true,
        subscription: true,
        automations: true,
        hashtags: true,
        hashtagSearches: true,
      },
    })

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 })
  }
} 