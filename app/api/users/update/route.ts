import { auth } from '@/auth';
import db from '@/lib/db';
import { NextResponse } from 'next/server';
import { UserRole, SubscriptionStatus } from '@prisma/client';

export async function PATCH(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { userId, role, subscriptionStatus } = body;

    if (!userId) {
      return new NextResponse('User ID is required', { status: 400 });
    }

    const updateData: any = {};
    if (role && Object.values(UserRole).includes(role)) {
      updateData.role = role;
    }

    // First find or create subscription
    let subscription = await db.subscription.findUnique({
      where: { userId }
    });

    if (subscriptionStatus) {
      if (subscription) {
        await db.subscription.update({
          where: { userId },
          data: { status: subscriptionStatus }
        });
      } else {
        await db.subscription.create({
          data: {
            userId,
            status: subscriptionStatus,
            priceId: 'price_basic',
            currentPeriodStart: new Date(),
            currentPeriodEnd: new Date(),
            features: [],
            metadata: {},
            user: {
              connect: { id: userId }
            }
          }
        });
      }
    }

    const user = await db.user.update({
      where: { id: userId },
      data: updateData,
      include: { subscription: true }
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Update error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 