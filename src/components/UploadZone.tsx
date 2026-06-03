import { useRef } from 'react'

interface UploadZoneProps {
  onImageUpload: (file: File) => void
  isLoading: boolean
  hasImage: boolean
}

export function UploadZone({ onImageUpload, isLoading, hasImage }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const dragCounter = useRef(0)

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current++
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current--
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current = 0

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

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all ${
        dragCounter.current > 0
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 bg-white hover:border-blue-500 hover:bg-blue-50'
      } ${isLoading ? 'opacity-60 pointer-events-none' : ''}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg"
        onChange={handleFileSelect}
        className="hidden"
      />

      {isLoading ? (
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-300 border-t-blue-600 mb-4"></div>
          <p className="text-gray-600 font-medium">Processing image...</p>
        </div>
      ) : (
        <>
          <div className="text-4xl mb-4">☁️</div>
          <p className="text-gray-700 font-semibold mb-2">
            {hasImage ? 'Image loaded! Upload another to replace' : 'Drag & drop image here'}
          </p>
          <p className="text-gray-500 text-sm mb-4">or</p>
          <button
            onClick={() => inputRef.current?.click()}
            className="text-blue-600 hover:text-blue-700 font-medium underline"
          >
            Browse files
          </button>
          <p className="text-gray-400 text-xs mt-4">PNG or JPG • Max 10MB • 64x64 to 2048x2048 pixels</p>
        </>
      )}
    </div>
  )
}