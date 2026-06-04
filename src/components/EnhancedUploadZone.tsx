import { useRef, useState } from 'react'
import { LoadingSpinner } from './LoadingSpinner'
import { Cloud, Upload, Sparkles } from 'lucide-react'

interface EnhancedUploadZoneProps {
  onImageUpload: (file: File) => void
  isLoading: boolean
  hasImage: boolean
  error?: string | null
}

export function EnhancedUploadZone({
  onImageUpload,
  isLoading,
  hasImage,
  error
}: EnhancedUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const dragCounter = useRef(0)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current++
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current--
    if (dragCounter.current === 0) {
      setIsDragging(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current = 0
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      onImageUpload(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onImageUpload(e.target.files[0])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      inputRef.current?.click()
    }
  }

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Upload image area. Drag and drop or press Enter to select file"
      className={`relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer ${
        isDragging
          ? 'border-purple-400 bg-purple-500/20 scale-105'
          : 'border-purple-500/30 bg-white/5 hover:border-purple-400 hover:bg-white/10'
      } ${isLoading ? 'opacity-60 pointer-events-none' : ''} ${
        error ? 'border-red-400 bg-red-500/10' : ''
      }`}
    >
      {/* Background sparkle effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg"
        onChange={handleFileSelect}
        className="hidden"
        aria-hidden="true"
      />

      <div className="relative z-10 p-12 text-center">
        {isLoading ? (
          <LoadingSpinner message="Processing your mystical image..." />
        ) : (
          <>
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <Cloud className="w-16 h-16 text-purple-300 relative z-10 mx-auto mb-4" />
            </div>
            <p className="text-purple-100 font-semibold mb-2 text-lg">
              {hasImage ? '✨ Image ready! Upload another? ✨' : 'Drop your magical image here'}
            </p>
            <p className="text-purple-300 text-sm mb-4">or</p>
            <button
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <Upload className="w-4 h-4" />
              Browse Files
            </button>
            <p className="text-purple-400 text-xs mt-4 flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3" />
              PNG or JPG • Max 10MB • 64x64 to 2048x2048 pixels
              <Sparkles className="w-3 h-3" />
            </p>
          </>
        )}
      </div>
    </div>
  )
}