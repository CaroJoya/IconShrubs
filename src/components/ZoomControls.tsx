import { ZoomIn, ZoomOut } from 'lucide-react'

interface ZoomControlsProps {
  zoomLevel: number
  onZoomIn: () => void
  onZoomOut: () => void
  onReset: () => void
  canZoomIn: boolean
  canZoomOut: boolean
}

export function ZoomControls({
  zoomLevel,
  onZoomIn,
  onZoomOut,
  canZoomIn,
  canZoomOut
}: ZoomControlsProps) {
  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-sm rounded-xl p-3 border border-purple-500/30 mb-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onZoomOut}
          disabled={!canZoomOut}
          className="p-2 rounded-lg bg-purple-600/80 hover:bg-purple-600 disabled:bg-gray-600/50 disabled:cursor-not-allowed text-white transition-all duration-200 hover:scale-105"
          title="Zoom Out (50%)"
        >
          <ZoomOut className="w-5 h-5" />
        </button>

        <div className="text-center min-w-[80px]">
          <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
            {zoomLevel}%
          </p>
          <p className="text-xs text-purple-400">Zoom Level</p>
        </div>

        <button
          onClick={onZoomIn}
          disabled={!canZoomIn}
          className="p-2 rounded-lg bg-purple-600/80 hover:bg-purple-600 disabled:bg-gray-600/50 disabled:cursor-not-allowed text-white transition-all duration-200 hover:scale-105"
          title="Zoom In (50%)"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}