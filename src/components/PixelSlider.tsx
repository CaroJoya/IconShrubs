interface PixelSliderProps {
    value: number
    onChange: (value: number) => void
    disabled?: boolean
  }
  
  export function PixelSlider({ value, onChange, disabled = false }: PixelSliderProps) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-lg font-semibold text-gray-900">
            Pixel Size
          </label>
          <span className="text-2xl font-bold text-blue-600">
            {value}px
          </span>
        </div>
  
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 font-medium">4px</span>
          <input
            type="range"
            min="4"
            max="24"
            step="1"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            disabled={disabled}
            className="flex-1 h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <span className="text-sm text-gray-600 font-medium">24px</span>
        </div>
  
        <p className="text-xs text-gray-500">
          Drag to adjust pixel block size. Smaller = more detail, larger = more blocky.
        </p>
      </div>
    )
  }