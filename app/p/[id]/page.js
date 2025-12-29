import connectDB from '@/lib/mongodb';
import Paste from '@/lib/pasteModel';
import { notFound } from 'next/navigation';

export default async function ViewPaste({ params }) {
  await connectDB();
  
  const { id } = await params;
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

  const formatExpiry = (date) => {
    const diff = new Date(date) - new Date();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    return `${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <div className="flex-grow py-12 px-4">
        <div className="max-w-4xl mx-auto">
          
          <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            
            <div className="border-b border-gray-700 px-6 py-4">
              <h1 className="text-xl font-semibold text-white">Paste Content</h1>
            </div>

            <div className="p-6">
              <pre className="bg-gray-900 border border-gray-700 rounded-md p-4 overflow-x-auto whitespace-pre-wrap break-words font-mono text-sm text-gray-100">
{paste.content}
              </pre>

              {(paste.max_views || paste.expires_at) && (
                <div className="mt-5 pt-5 border-t border-gray-700">
                  <div className="grid grid-cols-2 gap-4">
                    {paste.max_views !== null && (
                      <div className="bg-gray-900 border border-gray-700 rounded-md p-4">
                        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Views Remaining</p>
                        <p className="text-2xl font-semibold text-white">{paste.max_views - paste.view_count}</p>
                      </div>
                    )}
                    
                    {paste.expires_at && new Date() < paste.expires_at && (
                      <div className="bg-gray-900 border border-gray-700 rounded-md p-4">
                        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Expires In</p>
                        <p className="text-2xl font-semibold text-white">{formatExpiry(paste.expires_at)}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 text-center">
            <a 
              href="/" 
              className="inline-block bg-blue-600 text-white font-medium px-6 py-2.5 rounded-md hover:bg-blue-700 transition"
            >
              Create New Paste
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-6 mt-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-300 font-medium">Arvind Singh</p>
              <p className="text-gray-500 text-sm">Full Stack Developer</p>
            </div>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/arvindsingh2213/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition text-sm"
              >
                LinkedIn
              </a>
              <a
                href="/resume.pdf"
                download
                className="text-gray-400 hover:text-blue-400 transition text-sm"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
