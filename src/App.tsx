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
import { BackgroundRemovalPrompt } from './components/BackgroundRemovalPrompt'
import { BackgroundRemovalLoader } from './components/BackgroundRemovalLoader'
import { PixelationToggle } from './components/PixelationToggle'
import { useEffect, useState } from 'react'
import { Sparkles, Moon, Star, Flower, Crown, Download, Heart } from 'lucide-react'

function App() {
  const { 
    image, 
    error, 
    loading, 
    isRemovingBackground,
    showBackgroundPrompt,
    handleImageUpload, 
    handleBackgroundConfirm,
    handleBackgroundCancel,
    clearImage 
  } = useImageUpload()
  const { 
    pixelSize, 
    pixelatedCanvas, 
    usePixelation,
    updatePixelSize, 
    togglePixelation,
    applyPixelation, 
    reset 
  } = usePixelate()
  const { zoomLevel, zoomIn, zoomOut, resetZoom, canZoomIn, canZoomOut } = useZoom()
  const [showZoomed, setShowZoomed] = useState(false)
  const [showDownloadSuccess, setShowDownloadSuccess] = useState(false)
  const [a11yMessage, setA11yMessage] = useState('')

  // Apply initial pixelation when image loads
  useEffect(() => {
    if (image) {
      if (usePixelation) {
        applyPixelation(image, pixelSize)
      } else {
        // Show original image
        const originalCanvas = document.createElement('canvas')
        originalCanvas.width = image.canvas.width
        originalCanvas.height = image.canvas.height
        const ctx = originalCanvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(image.canvas, 0, 0)
        }
        // This is handled in togglePixelation, but we need to set initial state
        togglePixelation(false, image)
      }
      setA11yMessage('Image uploaded successfully')
      if (image.file.name.includes('_nobg')) {
        setA11yMessage('Background removed! ✨')
      }
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

  const handleTogglePixelation = (enabled: boolean) => {
    if (image) {
      togglePixelation(enabled, image)
      setA11yMessage(enabled ? 'Pixelation enabled ✨' : 'Using original image')
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
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Mystical Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-pulse delay-500"></div>
      </div>

      {/* Background Removal Components */}
      <BackgroundRemovalPrompt
        isOpen={showBackgroundPrompt}
        onConfirm={handleBackgroundConfirm}
        onCancel={handleBackgroundCancel}
        fileName={image?.file.name || 'your image'}
      />
      
      <BackgroundRemovalLoader isRemoving={isRemovingBackground} />

      {/* Accessibility Alert */}
      <AccessibilityAlert
        message={a11yMessage}
        type="info"
        visible={!!a11yMessage}
      />

      {/* Header with Mystical Design */}
      <header className="relative z-10 glass-card border-b border-purple-500/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-60 animate-pulse"></div>
                <Crown className="w-10 h-10 text-purple-300 relative z-10" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold">
                  <span className="gradient-text">IconShrubs</span>
                </h1>
                <p className="text-purple-200 mt-1 text-sm">Transform your images into mystical pixel art icons ✨</p>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse delay-300"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse delay-700"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Decorative floating elements */}
        <div className="absolute top-40 left-0 animate-float opacity-30 pointer-events-none">
          <Sparkles className="w-6 h-6 text-purple-300" />
        </div>
        <div className="absolute bottom-40 right-0 animate-float delay-1000 opacity-30 pointer-events-none">
          <Moon className="w-8 h-8 text-pink-300" />
        </div>

        {/* Upload Section with Mystical Card */}
        <div className="glass-card rounded-2xl p-8 mb-8 glass-card-hover">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-purple-100">Step 1: Upload Your Image</h2>
          </div>
          <EnhancedUploadZone
            onImageUpload={handleImageUpload}
            isLoading={loading || isRemovingBackground}
            hasImage={!!image}
            error={error}
          />
        </div>

        {/* Error Message */}
        {error && (
          <ErrorMessage
            message={error}
            onDismiss={() => handleClearImage()}
          />
        )}

        {/* Image Processing Section */}
        {image && (
          <>
            {/* Background Removal Badge */}
            {image.file.name.includes('_nobg') && (
              <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-purple-300" />
                  <p className="text-purple-200 text-sm">
                    ✨ Background successfully removed! Your icon will have a transparent background.
                  </p>
                </div>
              </div>
            )}

            {/* Pixelation Toggle - New Feature */}
            <PixelationToggle
              usePixelation={usePixelation}
              onToggle={handleTogglePixelation}
              disabled={loading}
            />

            {/* Pixel Size Slider - Only show when pixelation is enabled */}
            {usePixelation && (
              <div className="glass-card rounded-2xl p-8 mb-8 glass-card-hover">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Flower className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-purple-100">Step 2: Choose Pixel Magic</h2>
                </div>
                <EnhancedPixelSlider
                  value={pixelSize}
                  onChange={handlePixelSizeChange}
                  disabled={loading}
                />
              </div>
            )}

            {/* Preview Section */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="glass-card rounded-2xl p-8 glass-card-hover">
                <h3 className="text-xl font-semibold text-purple-100 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-300" />
                  Original Image
                </h3>
                <ImagePreview image={image} loading={loading} />
              </div>

              <div className="glass-card rounded-2xl p-8 glass-card-hover">
                <h3 className="text-xl font-semibold text-purple-100 mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-purple-300" />
                  {usePixelation ? 'Pixelated Magic' : 'Ready for Download'}
                </h3>
                
                {/* Toggle between normal and zoomed view */}
                <div className="mb-4">
                  <button
                    onClick={() => setShowZoomed(!showZoomed)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      showZoomed
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'glass-card text-purple-200 hover:bg-white/10'
                    }`}
                  >
                    {showZoomed ? '🔍 Zoomed View' : '👁️ Normal View'}
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
                
                {/* Info text when using original image */}
                {!usePixelation && (
                  <div className="mt-4 p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
                    <p className="text-purple-200 text-xs text-center">
                      ✨ Using original image quality - perfect for direct ICO conversion! ✨
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Download Section */}
            <div className="glass-card rounded-2xl p-8 mb-8 glass-card-hover mystical-glow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Download className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-purple-100">Step 3: Download Your Icon</h2>
              </div>
              <p className="text-purple-200 mb-6">
                {usePixelation 
                  ? 'Transform your pixel art into a Windows icon file (.ico) with mystical powers ✨'
                  : 'Convert your original image directly to a Windows icon file (.ico) ✨'}
              </p>
              <EnhancedDownloadButton
                canvas={pixelatedCanvas}
                disabled={!pixelatedCanvas}
                isLoading={loading}
                format="ico"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleClearImage}
                className="flex-1 px-6 py-3 glass-card text-purple-200 rounded-lg font-medium transition-all duration-300 hover:bg-white/10 hover:transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Upload Different Image
              </button>
            </div>
          </>
        )}

        {/* Tutorial Section */}
        <Tutorial />

        {/* Info Box */}
        {!image && (
          <div className="glass-card rounded-2xl p-8 mt-8 border border-purple-500/30 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
            <p className="text-purple-200 text-center">
              ✨ <strong className="text-purple-100">Welcome to IconShrubs!</strong> ✨<br />
              Transform your images into mystical pixel art and download as Windows icons<br />
              <span className="text-sm text-purple-300 mt-2 block">💡 Tip: Toggle between original and pixelated versions after uploading!</span>
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
      <footer className="relative z-10 mt-12 border-t border-purple-500/20 glass-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-purple-300 text-sm flex items-center justify-center gap-2">
            <Heart className="w-4 h-4 text-pink-400" />
            Made with mystical energy • Pixel Art Magic
            <Sparkles className="w-4 h-4 text-purple-400" />
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App