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
    onReset,
    canZoomIn,
    canZoomOut
  }: ZoomControlsProps) {
    return (
      <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={onZoomOut}
            disabled={!canZoomOut}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded font-medium transition"
            title="Zoom Out"
          >
            −
          </button>
  
          <div className="text-center min-w-24">
            <p className="text-sm text-gray-600">Zoom</p>
            <p className="text-lg font-bold text-gray-900">{zoomLevel}%</p>
          </div>
  
          <button
            onClick={onZoomIn}
            disabled={!canZoomIn}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded font-medium transition"
            title="Zoom In"
          >
            +
          </button>
        </div>
  
        <button
          onClick={onReset}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded font-medium transition"
          title="Reset Zoom"
        >
          Reset (100%)
        </button>
      </div>
    )
  }