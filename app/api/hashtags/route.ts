import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { auth } from '@/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const hashtags = await prisma.hashtags.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        searchedAt: 'desc'
      }
    })
    
    return NextResponse.json(hashtags)
  } catch (error) {
    console.error('[HASHTAGS_GET]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { name } = body

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    const hashtag = await prisma.hashtags.create({
      data: {
        userId: session.user.id,
        name,
      }
    })

    return NextResponse.json(hashtag)
  } catch (error) {
    console.error('[HASHTAGS_POST]', error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
