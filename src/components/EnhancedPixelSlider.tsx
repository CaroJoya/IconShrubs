import { Sparkles } from 'lucide-react'

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
        onChange(Math.max(1, value - step))  // Change from 4 to 1
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        onChange(Math.min(24, value + step))
      }
    }
  
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <label htmlFor="pixel-slider" className="text-lg font-semibold text-purple-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-300" />
            Pixel Size
          </label>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur-md opacity-50"></div>
            <span
              className="relative px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-bold text-xl inline-block"
              aria-live="polite"
              aria-atomic="true"
            >
              {value}px
            </span>
          </div>
        </div>
  
        <div className="flex items-center gap-4">
          <span className="text-sm text-purple-300 font-medium">1px</span>  {/* Change from 4px to 1px */}
          <input
            id="pixel-slider"
            type="range"
            min="1"  // Change from 4 to 1
            max="24"
            step="1"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            className="flex-1 h-2 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-purple-500/30 to-pink-500/30 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-500"
            style={{
              background: `linear-gradient(to right, #a855f7 ${((value - 1) / 23) * 100}%, rgba(168, 85, 247, 0.2) ${((value - 1) / 23) * 100}%)`  // Update calculation
            }}
            aria-label="Adjust pixel block size from 1 to 24 pixels"
            aria-valuenow={value}
            aria-valuemin={1}  // Change from 4 to 1
            aria-valuemax={24}
          />
          <span className="text-sm text-purple-300 font-medium">24px</span>
        </div>
  
        <p className="text-xs text-purple-400 text-center">
           Drag or use arrow keys to adjust pixel block size (1px = original quality) 
        </p>
      </div>
    )
  }