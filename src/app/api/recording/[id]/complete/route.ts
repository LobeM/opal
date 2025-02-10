import { client } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { id } = params;

    const completeProcessing = await client.video.update({
      where: {
        userId: id,
        source: body.filename,
      },
      data: {
        processing: false,
      },
    });
    if (completeProcessing) {
      console.log('🟢 Completed processing video');
      return NextResponse.json({ status: 200 });
    }
    return NextResponse.json({ status: 400 });
  } catch (error) {
    console.log('Error in complete video', error);
    return NextResponse.json({ status: 500 });
  }
}
