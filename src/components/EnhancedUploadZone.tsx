import { useRef, useState } from 'react'
import { LoadingSpinner } from './LoadingSpinner'

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
      className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all ${
        isDragging
          ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-300'
          : 'border-gray-300 bg-white hover:border-blue-500 hover:bg-blue-50'
      } ${isLoading ? 'opacity-60 pointer-events-none' : ''} ${
        error ? 'border-red-300 bg-red-50' : ''
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg"
        onChange={handleFileSelect}
        className="hidden"
        aria-hidden="true"
      />

      {isLoading ? (
        <LoadingSpinner message="Processing image..." />
      ) : (
        <>
          <div className="text-4xl mb-4" aria-hidden="true">
            ☁️
          </div>
          <p className="text-gray-700 font-semibold mb-2">
            {hasImage ? 'Image loaded! Upload another to replace' : 'Drag & drop image here'}
          </p>
          <p className="text-gray-500 text-sm mb-4">or</p>
          <button
            onClick={() => inputRef.current?.click()}
            className="text-blue-600 hover:text-blue-700 font-medium underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          >
            Browse files
          </button>
          <p className="text-gray-400 text-xs mt-4">
            PNG or JPG • Max 10MB • 64x64 to 2048x2048 pixels
          </p>
        </>
      )}
    </div>
  )
}