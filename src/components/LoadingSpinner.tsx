interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg'
    message?: string
  }
  
  export function LoadingSpinner({ size = 'md', message }: LoadingSpinnerProps) {
    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-8 w-8',
      lg: 'h-12 w-12'
    }
  
    const borderClasses = {
      sm: 'border-2',
      md: 'border-3',
      lg: 'border-4'
    }
  
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        <div
          className={`animate-spin rounded-full ${sizeClasses[size]} ${borderClasses[size]} border-blue-300 border-t-blue-600`}
          role="status"
          aria-label="Loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
        {message && <p className="text-gray-600 font-medium text-sm">{message}</p>}
      </div>
    )
  }