interface ErrorMessageProps {
    message: string
    onDismiss: () => void
  }
  
  export function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <span className="text-red-600 text-xl">⚠️</span>
            <div>
              <p className="text-red-800 font-semibold">Upload Error</p>
              <p className="text-red-700 text-sm mt-1">{message}</p>
            </div>
          </div>
          <button
            onClick={onDismiss}
            className="text-red-600 hover:text-red-800 font-bold"
          >
            ✕
          </button>
        </div>
      </div>
    )
  }