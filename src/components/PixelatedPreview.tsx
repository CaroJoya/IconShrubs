interface PixelatedPreviewProps {
    canvas: HTMLCanvasElement | null
    loading: boolean
  }
  
  export function PixelatedPreview({ canvas, loading }: PixelatedPreviewProps) {
    if (loading) {
      return (
        <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Pixelating...</div>
        </div>
      )
    }
  
    if (!canvas) {
      return (
        <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-gray-300">
          <p className="text-gray-400">Upload an image to see pixelated preview</p>
        </div>
      )
    }
  
    return (
      <div className="rounded-lg overflow-hidden border border-gray-300 bg-white">
        <canvas
          ref={(ref) => {
            if (ref) {
              ref.width = canvas.width
              ref.height = canvas.height
              const ctx = ref.getContext('2d')
              if (ctx) {
                ctx.drawImage(canvas, 0, 0)
              }
            }
          }}
          className="w-full h-auto max-h-96 object-contain bg-gray-50"
          style={{ imageRendering: 'pixelated' }}
        />
        <div className="bg-gray-50 px-4 py-2 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            {canvas.width}x{canvas.height}px • Pixelated
          </p>
        </div>
      </div>
    )
  }