interface DownloadSuccessProps {
    visible: boolean
    onDismiss: () => void
  }
  
  export function DownloadSuccess({ visible, onDismiss }: DownloadSuccessProps) {
    if (!visible) return null
  
    return (
      <div className="fixed top-4 right-4 bg-green-50 border border-green-300 rounded-lg p-4 shadow-lg animate-bounce max-w-sm">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="text-green-600 text-xl">✅</span>
            <div>
              <p className="text-green-800 font-semibold">Download Complete!</p>
              <p className="text-green-700 text-sm mt-1">PNG file saved to your computer</p>
            </div>
          </div>
          <button
            onClick={onDismiss}
            className="text-green-600 hover:text-green-800 font-bold text-lg"
          >
            ✕
          </button>
        </div>
      </div>
    )
  }