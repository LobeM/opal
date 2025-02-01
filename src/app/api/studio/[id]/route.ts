import { client } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const studio = await client.user.update({
      where: { id },
      data: {
        studio: {
          update: {
            screen: body.screen,
            mic: body.audio,
            preset: body.preset,
          },
        },
      },
    });

    if (!studio) {
      return NextResponse.json({
        status: 400,
        message: 'Oops! Something went wrong',
      });
    }

    return NextResponse.json({ status: 200, message: 'Studio updated' });
  } catch (error) {
    console.error('Error updating studio:', error);
    return NextResponse.json({
      status: 500,
      message: 'Internal server error',
    });
  }
}
