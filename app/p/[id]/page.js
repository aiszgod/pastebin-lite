import connectDB from '@/lib/mongodb';
import Paste from '@/lib/pasteModel';
import { notFound } from 'next/navigation';

export default async function ViewPaste({ params }) {
  await connectDB();
  
  const { id } = params;
  const paste = await Paste.findOne({ pasteId: id });

  if (!paste) {
    notFound();
  }

  if (paste.expires_at && new Date() >= paste.expires_at) {
    notFound();
  }

  if (paste.max_views !== null && paste.view_count >= paste.max_views) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-4">Paste Content</h1>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto whitespace-pre-wrap break-words">
            {paste.content}
          </pre>
          <div className="mt-4 text-sm text-gray-600">
            {paste.max_views && <p>Views remaining: {paste.max_views - paste.view_count}</p>}
            {paste.expires_at && <p>Expires: {paste.expires_at.toISOString()}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
