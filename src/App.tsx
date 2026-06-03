import { useImageUpload } from './hooks/useImageUpload'
import { usePixelate } from './hooks/usePixelate'
import { useZoom } from './hooks/useZoom'
import { UploadZone } from './components/UploadZone'
import { ErrorMessage } from './components/ErrorMessage'
import { ImagePreview } from './components/ImagePreview'
import { PixelSlider } from './components/PixelSlider'
import { PixelatedPreview } from './components/PixelatedPreview'
import { ZoomControls } from './components/ZoomControls'
import { ZoomedCanvas } from './components/ZoomedCanvas'
import { DownloadButton } from './components/DownloadButton'
import { DownloadSuccess } from './components/DownloadSuccess'
import { useEffect, useState } from 'react'

function App() {
  const { image, error, loading, handleImageUpload, clearImage } = useImageUpload()
  const { pixelSize, pixelatedCanvas, updatePixelSize, applyPixelation, reset } = usePixelate()
  const { zoomLevel, zoomIn, zoomOut, resetZoom, canZoomIn, canZoomOut } = useZoom()
  const [showZoomed, setShowZoomed] = useState(false)
  const [showDownloadSuccess, setShowDownloadSuccess] = useState(false)

  // Apply initial pixelation when image loads
  useEffect(() => {
    if (image) {
      applyPixelation(image, pixelSize)
    }
  }, [image])

  // Hide success message after 3 seconds
  useEffect(() => {
    if (showDownloadSuccess) {
      const timer = setTimeout(() => setShowDownloadSuccess(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [showDownloadSuccess])

  const handlePixelSizeChange = (newSize: number) => {
    if (image) {
      updatePixelSize(newSize, image)
    }
  }

  const handleClearImage = () => {
    clearImage()
    reset()
    resetZoom()
    setShowZoomed(false)
  }

  const handleDownloadClick = () => {
    setShowDownloadSuccess(true)
  }

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
            onDismiss={() => handleClearImage()}
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

        {/* Original & Pixelated Preview Section */}
        {image && (
          <>
            {/* Pixel Size Slider */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Step 2: Adjust Pixel Size</h2>
              <PixelSlider
                value={pixelSize}
                onChange={handlePixelSizeChange}
                disabled={loading}
              />
            </div>

            {/* Original Image */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Original Image</h2>
              <ImagePreview image={image} loading={loading} />
            </div>

            {/* Pixelated Preview */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Step 3: Preview & Zoom</h2>

              {/* Toggle between normal and zoomed view */}
              <div className="mb-4">
                <button
                  onClick={() => setShowZoomed(!showZoomed)}
                  className={`px-4 py-2 rounded font-medium transition ${
                    showZoomed
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {showZoomed ? '🔍 Zoomed View Active' : '👁️ Normal View'}
                </button>
              </div>

              {/* Show zoom controls when in zoomed view */}
              {showZoomed && pixelatedCanvas && (
                <ZoomControls
                  zoomLevel={zoomLevel}
                  onZoomIn={zoomIn}
                  onZoomOut={zoomOut}
                  onReset={resetZoom}
                  canZoomIn={canZoomIn}
                  canZoomOut={canZoomOut}
                />
              )}

              {/* Display appropriate preview */}
              {showZoomed ? (
                <ZoomedCanvas canvas={pixelatedCanvas} zoomLevel={zoomLevel} />
              ) : (
                <PixelatedPreview canvas={pixelatedCanvas} loading={loading} />
              )}
            </div>

            {/* Download Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Step 4: Download</h2>
              <p className="text-gray-600 mb-6">
                Ready to download? Click below to save as PNG. (Phase 5 will add .ico conversion)
              </p>
              <DownloadButton
                canvas={pixelatedCanvas}
                disabled={!pixelatedCanvas}
                isLoading={loading}
              />
              <p className="text-xs text-gray-500 mt-4 text-center">
                File will be saved as pixelicon_[timestamp].png
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleClearImage}
                className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition"
              >
                Upload Different Image
              </button>
            </div>
          </>
        )}

        {/* Info Box */}
        {!image && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-blue-900">
              ✅ <strong>Phase 4 Ready:</strong> Upload an image and download as PNG!
            </p>
          </div>
        )}
      </main>

      {/* Download Success Toast */}
      <DownloadSuccess
        visible={showDownloadSuccess}
        onDismiss={() => setShowDownloadSuccess(false)}
      />

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