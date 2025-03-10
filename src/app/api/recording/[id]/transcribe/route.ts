import { client } from '@/lib/prisma';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // WIP: Wire up AI agent
    const body = await req.json();
    const { id } = params;

    const content = JSON.parse(body.content);

    const transcribed = await client.video.update({
      where: {
        userId: id,
        source: body.filename,
      },
      data: {
        title: content.title,
        description: content.summary,
        summery: body.transcript,
      },
    });
    if (transcribed) {
      console.log('🟢 Transcribed video');
      const options = {
        method: 'POST',
        url: process.env.VOICEFLOW_KNOWLEDGE_BASE_API,
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: process.env.VOICEFLOW_KNOWLEDGE_BASE_API,
        },
        data: {
          data: {
            schema: {
              searchableFields: ['title', 'transcript'],
              metadataFields: ['title', 'transcript'],
            },
            name: content.title,
            items: [
              {
                title: content.title,
                transcript: body.transcript,
              },
            ],
          },
        },
      };

      const updateKB = await axios.request(options);
      if (updateKB.status === 200 || updateKB.status !== 200) {
        console.log(updateKB.status);
        return NextResponse.json({ status: 200 });
      }
    }
    return NextResponse.json({ status: 400 });
  } catch (error) {
    console.log('Error in transcribe video', error);
    return NextResponse.json({ status: 500 });
  }
}
