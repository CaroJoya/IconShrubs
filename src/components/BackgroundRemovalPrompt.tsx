import { Sparkles, X, Scissors, AlertCircle } from 'lucide-react'

interface BackgroundRemovalPromptProps {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
  fileName: string
}

export function BackgroundRemovalPrompt({ 
  isOpen, 
  onConfirm, 
  onCancel, 
  fileName 
}: BackgroundRemovalPromptProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      
      {/* Modal */}
      <div className="relative glass-card rounded-2xl p-8 max-w-md w-full animate-float">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-purple-300 hover:text-purple-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
            <Scissors className="w-10 h-10 text-white" />
          </div>
          
          <h3 className="text-2xl font-semibold text-purple-100 mb-2">
            Remove Background? ✨
          </h3>
          
          <p className="text-purple-200 mb-4">
            We noticed you uploaded a PNG file: <strong className="text-purple-100">{fileName}</strong>
          </p>
          
          <div className="bg-purple-500/20 rounded-lg p-4 mb-6 border border-purple-500/30">
            <div className="flex items-start gap-2">
              <Sparkles className="w-5 h-5 text-purple-300 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-purple-200 text-left">
                <strong className="text-purple-100">Recommendation:</strong> Removing the background can make your icon look much better, especially for logos or objects with transparent backgrounds!
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onConfirm}
              className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Yes, Remove Background
            </button>
            <button
              onClick={onCancel}
              className="flex-1 px-6 py-3 rounded-lg glass-card text-purple-200 font-medium transition-all duration-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              No, Keep Original
            </button>
          </div>
          
          <p className="text-xs text-purple-400 mt-4">
            ✨ Background removal works best with clear subjects and contrasting backgrounds
          </p>
        </div>
      </div>
    </div>
  )
}