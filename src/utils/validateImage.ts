import { ValidationResult } from '../types/index'

const ALLOWED_FORMATS = ['image/png', 'image/jpeg']
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const MIN_DIMENSION = 64
const MAX_DIMENSION = 2048

export async function validateImage(file: File): Promise<ValidationResult> {
  // Check file type
  if (!ALLOWED_FORMATS.includes(file.type)) {
    return {
      valid: false,
      error: 'Please upload a PNG or JPG file'
    }
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File too large. Maximum ${MAX_FILE_SIZE / 1024 / 1024}MB`
    }
  }

  // Load image and check dimensions
  return new Promise((resolve) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      const img = new Image()

      img.onload = () => {
        // Check dimensions
        if (img.width < MIN_DIMENSION || img.height < MIN_DIMENSION) {
          resolve({
            valid: false,
            error: `Image too small. Minimum ${MIN_DIMENSION}x${MIN_DIMENSION} pixels`
          })
          return
        }

        if (img.width > MAX_DIMENSION || img.height > MAX_DIMENSION) {
          resolve({
            valid: false,
            error: `Image too large. Maximum ${MAX_DIMENSION}x${MAX_DIMENSION} pixels`
          })
          return
        }

        // Create canvas with image data
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(img, 0, 0)
        }

        resolve({
          valid: true,
          data: {
            file,
            dataUrl: e.target?.result as string,
            width: img.width,
            height: img.height,
            canvas
          }
        })
      }

      img.onerror = () => {
        resolve({
          valid: false,
          error: 'Could not read this image. Try another file'
        })
      }

      img.src = e.target?.result as string
    }

    reader.readAsDataURL(file)
  })
}