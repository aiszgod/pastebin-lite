export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-200 mb-2">Paste Not Found</h2>
          <p className="text-gray-400 mb-8">
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

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-6">
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
