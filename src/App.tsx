function App() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              🎨 PixelIcon
            </h1>
            <p className="text-gray-600 mt-2">Convert any image to pixel art & download as .ico</p>
          </div>
        </header>
  
        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <p className="text-gray-600 text-lg">
                Phase 0: Setup Complete! ✅
              </p>
              <p className="text-gray-500 mt-4">
                Ready to build Phase 1: Image Upload & Validation
              </p>
            </div>
          </div>
        </main>
  
        {/* Footer */}
        <footer className="bg-white mt-12 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-500 text-sm">
            <p>Learning Project • Convert Images to Pixel Art Icons</p>
          </div>
        </footer>
      </div>
    )
  }
  
  export default App