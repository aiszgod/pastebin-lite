import connectDB from '@/lib/mongodb';
import Paste from '@/lib/pasteModel';
import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { content, ttl_seconds, max_views } = body;

    if (!content || typeof content !== 'string' || content.trim() === '') {
      return NextResponse.json(
        { error: 'content is required and must be a non-empty string' },
        { status: 400 }
        
      );
    }

    if (ttl_seconds !== undefined && (typeof ttl_seconds !== 'number' || ttl_seconds < 1)) {
      return NextResponse.json(
        { error: 'ttl_seconds must be an integer >= 1' },
        { status: 400 }
      );
    }

    if (max_views !== undefined && (typeof max_views !== 'number' || max_views < 1)) {
      return NextResponse.json(
        { error: 'max_views must be an integer >= 1' },
        { status: 400 }
      );
    }

    const pasteId = nanoid(10);
    const expires_at = ttl_seconds ? new Date(Date.now() + ttl_seconds * 1000) : null;

    await Paste.create({
      pasteId,
      content,
      ttl_seconds: ttl_seconds || null,
      max_views: max_views || null,
      expires_at
    });

    const baseUrl = request.headers.get('host');
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const url = `${protocol}://${baseUrl}/p/${pasteId}`;

    return NextResponse.json({ id: pasteId, url });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
