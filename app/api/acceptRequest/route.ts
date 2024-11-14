// pages/api/updateRequestStatus.js

import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  const { notificationId, action } = await req.json();

  if (!notificationId || !action) {
    return NextResponse.json({ error: 'Missing parameters' });
  }

  let status;

  switch (action) {
    case 'accept':
      status = 'accepted';
      break;
    case 'deny':
      status = 'denied';
      break;
    default:
      return NextResponse.json({ error: 'Invalid action' });
  }

  try {
    const notification = await prisma.notification.update({
      where: { id: notificationId },
      data: { status },
    });

    if (!notification) {
      return NextResponse.json({ error: 'Notification not found' });
    }

    return NextResponse.json({ message: `Request ${status}`, notification });
  } catch (error) {
    console.error('Error updating status:', error);
    return NextResponse.json({ error: 'Failed to update status' });
  }
}
