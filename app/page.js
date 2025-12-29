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
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Pastebin</h1>
          <p className="text-gray-600 mt-2">Share text with automatically expiring links</p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none h-40 resize-none font-mono text-sm"
              placeholder="Paste your text here..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expire After (minutes)
              </label>
              <input
                type="number"
                value={ttl}
                onChange={(e) => setTtl(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Optional"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Views
              </label>
              <input
                type="number"
                value={maxViews}
                onChange={(e) => setMaxViews(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="bg-green-50 border border-green-200 px-4 py-4 rounded-md">
            <p className="font-medium text-green-900 mb-3">Paste created successfully</p>
            <div className="bg-white border border-gray-200 rounded-md p-3 mb-3">
              <p className="text-xs text-gray-500 mb-1">Shareable Link</p>
              <p className="text-sm font-mono text-gray-800 break-all">{result.url}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={copyToClipboard}
                className="flex-1 bg-gray-800 text-white font-medium rounded-md py-2 hover:bg-gray-900 transition"
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
  );
}
