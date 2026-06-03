import { useImageUpload } from './hooks/useImageUpload'
import { UploadZone } from './components/UploadZone'
import { ErrorMessage } from './components/ErrorMessage'
import { ImagePreview } from './components/ImagePreview'

function App() {
  const { image, error, loading, handleImageUpload, clearImage } = useImageUpload()

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
        {/* Error Message */}
        {error && (
          <ErrorMessage
              message={error}
              onDismiss={() => clearImage()}
          />
        )}

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Step 1: Upload Image</h2>
          <UploadZone
            onImageUpload={handleImageUpload}
            isLoading={loading}
            hasImage={!!image}
          />
        </div>

        {/* Preview Section */}
        {image && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Original Image</h2>
            <ImagePreview image={image} loading={loading} />
            <button
              onClick={clearImage}
              className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition"
            >
              Upload Different Image
            </button>
          </div>
        )}

        {/* Info Box */}
        {!image && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-blue-900">
              ✅ <strong>Phase 1 Complete:</strong> Upload and validate images. Next: Pixelation engine!
            </p>
          </div>
        )}
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