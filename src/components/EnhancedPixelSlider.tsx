interface EnhancedPixelSliderProps {
    value: number
    onChange: (value: number) => void
    disabled?: boolean
  }
  
  export function EnhancedPixelSlider({
    value,
    onChange,
    disabled = false
  }: EnhancedPixelSliderProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(Number(e.target.value))
    }
  
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const step = 1
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        onChange(Math.max(4, value - step))
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        onChange(Math.min(24, value + step))
      }
    }
  
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="pixel-slider" className="text-lg font-semibold text-gray-900">
            Pixel Size
          </label>
          <span
            className="text-2xl font-bold text-blue-600"
            aria-live="polite"
            aria-atomic="true"
          >
            {value}px
          </span>
        </div>
  
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 font-medium">4px</span>
          <input
            id="pixel-slider"
            type="range"
            min="4"
            max="24"
            step="1"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            className="flex-1 h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Adjust pixel block size from 4 to 24 pixels"
            aria-valuenow={value}
            aria-valuemin={4}
            aria-valuemax={24}
          />
          <span className="text-sm text-gray-600 font-medium">24px</span>
        </div>
  
        <p className="text-xs text-gray-500">
          Drag or use arrow keys to adjust pixel block size. Smaller = more detail, larger = more blocky.
        </p>
      </div>
    )
  }