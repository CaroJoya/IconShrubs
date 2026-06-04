import { ImageIcon, Sparkles } from 'lucide-react'

interface PixelationToggleProps {
  usePixelation: boolean
  onToggle: (value: boolean) => void
  disabled?: boolean
}

export function PixelationToggle({ usePixelation, onToggle, disabled = false }: PixelationToggleProps) {
  return (
    <div className="glass-card rounded-2xl p-6 mb-8">
      <h3 className="text-xl font-semibold text-purple-100 mb-4 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-purple-300" />
        Image Style
      </h3>
      
      <div className="flex gap-4">
        <button
          onClick={() => onToggle(false)}
          disabled={disabled}
          className={`flex-1 px-6 py-4 rounded-xl transition-all duration-300 ${
            !usePixelation
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105'
              : 'glass-card text-purple-300 hover:bg-white/10'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <div className="flex flex-col items-center gap-2">
            <ImageIcon className="w-6 h-6" />
            <span className="font-semibold">Original Image</span>
            <span className="text-xs opacity-80">No pixelation, direct ICO</span>
          </div>
        </button>
        
        <button
          onClick={() => onToggle(true)}
          disabled={disabled}
          className={`flex-1 px-6 py-4 rounded-xl transition-all duration-300 ${
            usePixelation
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105'
              : 'glass-card text-purple-300 hover:bg-white/10'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <div className="flex flex-col items-center gap-2">
            <Sparkles className="w-6 h-6" />
            <span className="font-semibold">Pixelated</span>
            <span className="text-xs opacity-80">Apply pixel art effect</span>
          </div>
        </button>
      </div>
      
      <p className="text-xs text-purple-400 text-center mt-4">
        ✨ Choose your preferred style before downloading ✨
      </p>
    </div>
  )
}