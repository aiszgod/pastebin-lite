'use client';

import { useState } from 'react';

export default function Home() {
  const [content, setContent] = useState('');
  const [ttl, setTtl] = useState('');
  const [maxViews, setMaxViews] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);

    const body = { content };
    if (ttl) body.ttl_seconds = parseInt(ttl) * 60;
    if (maxViews) body.max_views = parseInt(maxViews);

    try {
      const res = await fetch('/api/pastes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      
      if (res.ok) {
        setResult(data);
        setContent('');
        setTtl('');
        setMaxViews('');
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to create paste');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result.url);
    alert('Link copied to clipboard');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <div className="flex-grow py-12 px-4">
        <div className="max-w-3xl mx-auto">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Pastebin</h1>
            <p className="text-gray-400 mt-2">Share code and text with self-destructing links</p>
          </div>
          
          <form onSubmit={handleSubmit} className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
            
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 text-gray-100 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none h-40 resize-none font-mono text-sm placeholder-gray-500"
                placeholder="Paste your text here..."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Expire After (minutes)
                </label>
                <input
                  type="number"
                  value={ttl}
                  onChange={(e) => setTtl(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 text-gray-100 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-gray-500"
                  placeholder="Optional"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Maximum Views
                </label>
                <input
                  type="number"
                  value={maxViews}
                  onChange={(e) => setMaxViews(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 text-gray-100 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-gray-500"
                  placeholder="Optional"
                  min="1"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-medium rounded-md py-3 hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Paste'}
            </button>
          </form>

          {error && (
            <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-md">
              <p className="font-medium">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {result && (
            <div className="bg-gray-800 border border-gray-700 px-4 py-4 rounded-md">
              <p className="font-medium text-green-400 mb-3">Paste created successfully</p>
              <div className="bg-gray-900 border border-gray-700 rounded-md p-3 mb-3">
                <p className="text-xs text-gray-400 mb-1">Shareable Link</p>
                <p className="text-sm font-mono text-gray-200 break-all">{result.url}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={copyToClipboard}
                  className="flex-1 bg-gray-700 text-white font-medium rounded-md py-2 hover:bg-gray-600 transition"
                >
                  Copy Link
                </button>
                <a
                  href={result.url}
                  target="_blank"
                  className="flex-1 bg-blue-600 text-white font-medium rounded-md py-2 hover:bg-blue-700 transition text-center"
                >
                  View Paste
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-6 mt-8">
        <div className="max-w-3xl mx-auto px-4">
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
