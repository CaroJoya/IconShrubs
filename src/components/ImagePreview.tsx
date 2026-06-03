import { ImageData } from '../types/index'

interface ImagePreviewProps {
  image: ImageData | null
  loading: boolean
}

export function ImagePreview({ image, loading }: ImagePreviewProps) {
  if (loading) {
    return (
      <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    )
  }

  if (!image) {
    return (
      <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-gray-300">
        <p className="text-gray-400">Preview will appear here</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg overflow-hidden border border-gray-300 bg-white">
      <img
        src={image.dataUrl}
        alt="Preview"
        className="w-full h-auto max-h-96 object-contain bg-gray-50"
      />
      <div className="bg-gray-50 px-4 py-2 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          {image.width}x{image.height}px • {(image.file.size / 1024).toFixed(2)}KB
        </p>
      </div>
    </div>
  )
}