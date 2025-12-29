import connectDB from '@/lib/mongodb';
import Paste from '@/lib/pasteModel';
import { NextResponse } from 'next/server';
import { getCurrentTime } from '@/utils/timeHelper';

export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const { id } = await params;  // ← ADD await HERE
    const currentTime = getCurrentTime(request.headers);

    const paste = await Paste.findOne({ pasteId: id });

    if (!paste) {
      return NextResponse.json({ error: 'Paste not found' }, { status: 404 });
    }

    if (paste.expires_at && new Date(currentTime) >= paste.expires_at) {
      return NextResponse.json({ error: 'Paste expired' }, { status: 404 });
    }

    if (paste.max_views !== null && paste.view_count >= paste.max_views) {
      return NextResponse.json({ error: 'View limit exceeded' }, { status: 404 });
    }

    await Paste.updateOne(
      { pasteId: id },
      { $inc: { view_count: 1 } }
    );

    const remaining_views = paste.max_views !== null ? paste.max_views - paste.view_count - 1 : null;

    return NextResponse.json({
      content: paste.content,
      remaining_views: remaining_views,
      expires_at: paste.expires_at
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
