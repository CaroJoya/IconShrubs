export const ERROR_MESSAGES = {
    FILE_TYPE: 'Please upload a PNG or JPG file',
    FILE_SIZE: 'File too large. Maximum 10MB',
    IMAGE_TOO_SMALL: 'Image too small. Minimum 64x64 pixels',
    IMAGE_TOO_LARGE: 'Image too large. Maximum 2048x2048 pixels',
    IMAGE_READ_FAILED: 'Could not read this image. Try another file',
    DOWNLOAD_PNG_FAILED: 'Failed to download PNG',
    DOWNLOAD_ICO_FAILED: 'Failed to convert and download ICO',
    CONVERSION_FAILED: 'Failed to convert image. Please try again.',
    RATE_LIMITED: 'Too many requests. Please try again in an hour.',
    NETWORK_ERROR: 'Network error. Please check your connection.',
    UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.'
  }
  
  export function getUserFriendlyError(error: unknown): string {
    if (error instanceof Error) {
      // Check if it's a known error message
      const errorMsg = error.message
      
      if (errorMsg.includes('429')) return ERROR_MESSAGES.RATE_LIMITED
      if (errorMsg.includes('network')) return ERROR_MESSAGES.NETWORK_ERROR
      if (errorMsg.includes('timeout')) return ERROR_MESSAGES.NETWORK_ERROR
      
      return errorMsg
    }
  
    return ERROR_MESSAGES.UNKNOWN_ERROR
  }