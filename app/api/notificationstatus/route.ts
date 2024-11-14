// pages/api/getNotificationStatus.js

import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  const { notificationId } =await req.json();

  if (!notificationId) {
    return NextResponse.json({ error: 'Missing notificationId' });
  }

  try {
    const notification = await prisma.notification.findUnique({
      where: { id: parseInt(notificationId, 10) },
      select: { status: true },
    });

    if (!notification) {
      return NextResponse.json({ error: 'Notification not found' } , {status:500});
    }

    return NextResponse.json({ status: notification.status });
  } catch (error) {
    console.error('Error fetching notification:', error);
    return NextResponse.json({ error: 'Failed to fetch notification' } , {status:500});
  }
}
