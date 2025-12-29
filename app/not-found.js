export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Paste Not Found</h2>
        <p className="text-gray-600 mb-8">
          This paste may have expired, reached its view limit, or never existed.
        </p>
        <a 
          href="/" 
          className="inline-block bg-blue-600 text-white font-medium px-6 py-2.5 rounded-md hover:bg-blue-700 transition"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
}
