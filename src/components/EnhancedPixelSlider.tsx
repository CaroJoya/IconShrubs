import { Sparkles } from 'lucide-react'

interface EnhancedPixelSliderProps {
    value: number
    onChange: (value: number) => void
    disabled?: boolean
  }
  
  // Preset sizes based on the 1-24 range
  const PRESET_SIZES = [
    { label: 'Tiny', value: 1, description: 'Original quality' },
    { label: 'Small', value: 4, description: 'Subtle pixel effect' },
    { label: 'Medium', value: 8, description: 'Classic pixel art' },
    { label: 'Large', value: 16, description: 'Bold pixel blocks' },
    { label: 'Giant', value: 24, description: 'Maximum pixelation' },
  ]
  
  export function EnhancedPixelSlider({
    value,
    onChange,
    disabled = false
  }: EnhancedPixelSliderProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(Number(e.target.value))
    }
  
    const handlePresetClick = (presetValue: number) => {
      onChange(presetValue)
    }
  
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const step = 1
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        onChange(Math.max(1, value - step))
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        onChange(Math.min(24, value + step))
      }
    }
  
    // Find current preset label for display
    const currentPreset = PRESET_SIZES.find(p => p.value === value)
  
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
              {currentPreset && (
                <span className="text-xs ml-2 text-purple-200 font-normal">
                  ({currentPreset.label})
                </span>
              )}
            </span>
          </div>
        </div>
  
        {/* Preset Buttons */}
        <div className="grid grid-cols-5 gap-2">
          {PRESET_SIZES.map((preset) => (
            <button
              key={preset.value}
              onClick={() => handlePresetClick(preset.value)}
              disabled={disabled}
              className={`
                relative py-2 px-3 rounded-lg font-medium text-sm transition-all duration-200
                ${value === preset.value 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105' 
                  : 'glass-card text-purple-300 hover:bg-white/10 hover:scale-105'
                }
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                focus:outline-none focus:ring-2 focus:ring-purple-500
              `}
              title={preset.description}
            >
              <div className="flex flex-col items-center">
                <span className="font-semibold">{preset.label}</span>
                <span className="text-xs opacity-70">{preset.value}px</span>
              </div>
            </button>
          ))}
        </div>
  
        {/* Slider for fine-tuning */}
        <div className="pt-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-purple-300 font-medium">1px</span>
            <input
              id="pixel-slider"
              type="range"
              min="1"
              max="24"
              step="1"
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              className="flex-1 h-2 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-purple-500/30 to-pink-500/30 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-500"
              style={{
                background: `linear-gradient(to right, #a855f7 ${((value - 1) / 23) * 100}%, rgba(168, 85, 247, 0.2) ${((value - 1) / 23) * 100}%)`
              }}
              aria-label="Adjust pixel block size from 1 to 24 pixels"
              aria-valuenow={value}
              aria-valuemin={1}
              aria-valuemax={24}
            />
            <span className="text-sm text-purple-300 font-medium">24px</span>
          </div>
        </div>
  
        <p className="text-xs text-purple-400 text-center">
          🎮 Click preset buttons for quick changes or drag slider for fine-tuning (1-24px)
        </p>
      </div>
    )
  }