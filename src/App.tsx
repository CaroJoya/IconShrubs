import { useImageUpload } from './hooks/useImageUpload'
import { usePixelate } from './hooks/usePixelate'
import { useZoom } from './hooks/useZoom'
import { EnhancedUploadZone } from './components/EnhancedUploadZone'
import { ErrorMessage } from './components/ErrorMessage'
import { ImagePreview } from './components/ImagePreview'
import { EnhancedPixelSlider } from './components/EnhancedPixelSlider'
import { PixelatedPreview } from './components/PixelatedPreview'
import { ZoomControls } from './components/ZoomControls'
import { ZoomedCanvas } from './components/ZoomedCanvas'
import { EnhancedDownloadButton } from './components/EnhancedDownloadButton'
import { DownloadSuccess } from './components/DownloadSuccess'
import { AccessibilityAlert } from './components/AccessibilityAlert'
import { Tutorial } from './components/Tutorial'
import { useEffect, useState } from 'react'

function App() {
  const { image, error, loading, handleImageUpload, clearImage } = useImageUpload()
  const { pixelSize, pixelatedCanvas, updatePixelSize, applyPixelation, reset } = usePixelate()
  const { zoomLevel, zoomIn, zoomOut, resetZoom, canZoomIn, canZoomOut } = useZoom()
  const [showZoomed, setShowZoomed] = useState(false)
  const [showDownloadSuccess, setShowDownloadSuccess] = useState(false)
  const [a11yMessage, setA11yMessage] = useState('')

  // Apply initial pixelation when image loads
  useEffect(() => {
    if (image) {
      applyPixelation(image, pixelSize)
      setA11yMessage('Image uploaded successfully')
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
      setA11yMessage(`Pixel size changed to ${newSize}px`)
    }
  }

  const handleClearImage = () => {
    clearImage()
    reset()
    resetZoom()
    setShowZoomed(false)
    setA11yMessage('Image cleared')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Accessibility Alert */}
      <AccessibilityAlert
        message={a11yMessage}
        type="info"
        visible={!!a11yMessage}
      />

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
          <EnhancedUploadZone
            onImageUpload={handleImageUpload}
            isLoading={loading}
            hasImage={!!image}
            error={error}
          />
        </div>

        {/* Original & Pixelated Preview Section */}
        {image && (
          <>
            {/* Pixel Size Slider */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Step 2: Adjust Pixel Size</h2>
              <EnhancedPixelSlider
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
                  className={`px-4 py-2 rounded font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    showZoomed
                      ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500'
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
                Download your pixelated image as a Windows icon file (.ico). The server will convert it automatically.
              </p>
              <EnhancedDownloadButton
                canvas={pixelatedCanvas}
                disabled={!pixelatedCanvas}
                isLoading={loading}
                format="png"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleClearImage}
                className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Upload Different Image
              </button>
            </div>
          </>
        )}

        {/* Tutorial Section - Always visible */}
        <Tutorial />

        {/* Info Box */}
        {!image && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
            <p className="text-green-900">
              ✅ <strong>Phase 7 Complete:</strong> Enhanced with error handling, accessibility, and keyboard navigation!
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