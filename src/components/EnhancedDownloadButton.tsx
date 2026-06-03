import { useState } from 'react'
import { LoadingSpinner } from './LoadingSpinner'
import { getUserFriendlyError } from '../utils/errorMessages'

interface EnhancedDownloadButtonProps {
  canvas: HTMLCanvasElement | null
  disabled?: boolean
  isLoading?: boolean
  format: 'png' | 'ico'
}

export function EnhancedDownloadButton({
  canvas,
  disabled = false,
  isLoading = false,
  format = 'ico'
}: EnhancedDownloadButtonProps) {
  const [downloadLoading, setDownloadLoading] = useState(false)
  const [downloadError, setDownloadError] = useState<string | null>(null)

  const handleDownloadPNG = () => {
    if (!canvas) return

    try {
      const link = document.createElement('a')
      link.href = canvas.toDataURL('image/png')
      link.download = `pixelicon_${Date.now()}.png`

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      const friendlyError = getUserFriendlyError(error)
      setDownloadError(friendlyError)
      console.error('PNG download error:', error)
    }
  }

  const handleDownloadICO = async () => {
    if (!canvas) return
  
    setDownloadLoading(true)
    setDownloadError(null)
  
    try {
      const pngDataUrl = canvas.toDataURL('image/png')
      const base64 = pngDataUrl.split(',')[1]
  
      const response = await fetch('/api/convert-to-ico', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image: base64 })
      })
  
      if (!response.ok) {
        // Try to parse as JSON if it's an error response
        try {
          const errorData = await response.json()
          throw new Error(errorData.error || `Conversion failed (${response.status})`)
        } catch {
          throw new Error(`Conversion failed (${response.status})`)
        }
      }
  
      // Get the ICO file as blob (don't parse as JSON)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `pixelicon_${Date.now()}.ico`
  
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
  
      URL.revokeObjectURL(url)
    } catch (error) {
      const friendlyError = getUserFriendlyError(error)
      setDownloadError(friendlyError)
      console.error('ICO download error:', error)
    } finally {
      setDownloadLoading(false)
    }
  }

  const handleClick = format === 'ico' ? handleDownloadICO : handleDownloadPNG
  const isProcessing = isLoading || downloadLoading
  const buttonText =
    format === 'ico'
      ? downloadLoading
        ? 'Converting to ICO...'
        : '📥 Download as .ico'
      : '📥 Download as PNG'

  return (
    <>
      <button
        onClick={handleClick}
        disabled={disabled || isProcessing}
        className={`w-full px-6 py-4 rounded-lg font-semibold text-lg transition flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          disabled || isProcessing
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
            : 'bg-green-600 hover:bg-green-700 text-white cursor-pointer focus:ring-green-500'
        }`}
        aria-busy={isProcessing}
        aria-disabled={disabled || isProcessing}
      >
        {isProcessing ? (
          <>
            <LoadingSpinner size="sm" />
            {format === 'ico' ? 'Converting...' : 'Downloading...'}
          </>
        ) : (
          buttonText
        )}
      </button>

      {downloadError && (
        <div
          className="mt-4 bg-red-50 border border-red-200 rounded p-4"
          role="alert"
        >
          <div className="flex gap-3">
            <span className="text-red-600 text-xl flex-shrink-0">⚠️</span>
            <div className="flex-1">
              <p className="text-red-800 font-semibold text-sm">Download Error</p>
              <p className="text-red-700 text-sm mt-1">{downloadError}</p>
            </div>
            <button
              onClick={() => setDownloadError(null)}
              className="text-red-600 hover:text-red-800 font-bold"
              aria-label="Dismiss error"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500 mt-4 text-center">
        File will be saved as pixelicon_[timestamp].{format}
      </p>
    </>
  )
}