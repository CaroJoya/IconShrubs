import { Sparkles } from 'lucide-react'

interface BackgroundRemovalLoaderProps {
  isRemoving: boolean
}

export function BackgroundRemovalLoader({ isRemoving }: BackgroundRemovalLoaderProps) {
  if (!isRemoving) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      <div className="relative glass-card rounded-2xl p-8 max-w-sm w-full text-center">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Sparkles className="w-10 h-10 text-white animate-spin" />
          </div>
          
          <h3 className="text-2xl font-semibold text-purple-100 mb-2">
            Removing Background...
          </h3>
          
          <p className="text-purple-200">
            Our mystical AI is working its magic 
          </p>
          
          <div className="mt-6 w-full bg-purple-500/20 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }} />
          </div>
        </div>
      </div>
    </div>
  )
}