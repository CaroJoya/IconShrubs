interface DownloadButtonProps {
    canvas: HTMLCanvasElement | null
    disabled?: boolean
    isLoading?: boolean
    format: 'png' | 'ico'
  }
  export function DownloadButton({ canvas, disabled = false, isLoading = false }: DownloadButtonProps) {
    const handleDownloadPNG = () => {
      if (!canvas) return
  
      // Create a temporary link element
      const link = document.createElement('a')
      link.href = canvas.toDataURL('image/png')
      link.download = `pixelicon_${Date.now()}.png`
      
      // Trigger download
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  
    return (
      <button
        onClick={handleDownloadPNG}
        disabled={disabled || isLoading}
        className={`w-full px-6 py-4 rounded-lg font-semibold text-lg transition flex items-center justify-center gap-2 ${
          disabled || isLoading
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
            : 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'
        }`}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            Converting...
          </>
        ) : (
          <>
            📥 Download as PNG
          </>
        )}
      </button>
    )
  }